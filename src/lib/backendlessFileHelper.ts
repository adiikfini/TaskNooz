// Helper untuk upload file ke Backendless Files API
// Docs: https://backendless.com/docs/rest/files/

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

const UPLOAD_DIR = "blogs"; // Directory di Backendless Files untuk menyimpan images

export async function uploadImageToBackendless(fileBuffer: Buffer, fileName: string): Promise<{ url: string | null; debug?: string[] }> {
  const debug: string[] = [];
  try {
  // Generate base filename (timestamp + sanitized original) and allow retries if Backendless says file exists
  const timestamp = Date.now();
  const baseName = `${timestamp}-${fileName.replace(/\s+/g, "-")}`;
  let uniqueFileName = baseName;
    
    // Construct file URL (encoded filename)
    const fileUrl = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/files/${UPLOAD_DIR}/${encodeURIComponent(uniqueFileName)}`;

    // Basic mime-type detection from extension
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === 'png') contentType = 'image/png';
    else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
    else if (ext === 'webp') contentType = 'image/webp';
    else if (ext === 'gif') contentType = 'image/gif';

    // First attempt: PUT raw bytes (server-friendly)
    try {
      const putRes = await fetch(fileUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: fileBuffer as any,
      });

      if (putRes.ok) return { url: fileUrl, debug };
      const putErr = await putRes.text().catch(() => '<no body>');
      const putMsg = `PUT upload returned non-ok; falling back to POST. status=${putRes.status} body=${putErr}`;
      console.warn(putMsg);
      debug.push(putMsg);
    } catch (putErr) {
      const putMsg = `PUT upload failed, will try POST fallback: ${String(putErr)}`;
      console.warn(putMsg);
      debug.push(putMsg);
    }

    // Fallback: POST multipart/form-data constructed manually to avoid runtime FormData/Blob issues
    try {
      const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/files/${UPLOAD_DIR}`;

      // Build multipart body manually
      const boundary = `----backendlessFormBoundary${Date.now()}`;
      const nl = '\r\n';

      const makeBody = (fieldName: string) => {
        const header = `--${boundary}${nl}` +
          `Content-Disposition: form-data; name="${fieldName}"; filename="${uniqueFileName}"${nl}` +
          `Content-Type: ${contentType}${nl}${nl}`;
        const footer = `${nl}--${boundary}--${nl}`;

        const headerBuf = Buffer.from(header, 'utf8');
        const footerBuf = Buffer.from(footer, 'utf8');
        return Buffer.concat([headerBuf, fileBuffer as Buffer, footerBuf]);
      };

      // Try common field names if Backendless expects something else. First 'file', then 'data'.
      const fieldNamesToTry = ['file', 'data'];
  const maxAttempts = 5;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // If not first attempt, append a small random suffix to filename to avoid 'file already exists'
        if (attempt > 0) {
          uniqueFileName = `${baseName}-${Math.random().toString(36).slice(2, 8)}`;
        }

        for (const fieldName of fieldNamesToTry) {
          const body = makeBody(fieldName);
          try {
            const postRes = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': String(body.length),
              },
              body,
            });

            const text = await postRes.text().catch(() => '<no body>');
            if (!postRes.ok) {
              const warnMsg = `POST upload attempt #${attempt + 1} with field='${fieldName}' failed: status=${postRes.status} body=${text}`;
              console.warn(warnMsg);
              debug.push(warnMsg);
              // detect specific Backendless error that indicates file already exists (code 6003)
              try {
                const parsed = JSON.parse(text);
                if (parsed?.code === 6003 && parsed?.message && parsed.message.toLowerCase().includes('file already exists')) {
                  const existMsg = 'Backendless indicates file already exists — will retry with different filename';
                  console.log(existMsg);
                  debug.push(existMsg);
                  // continue to next iteration to change filename
                  continue;
                }
              } catch (e) {
                // ignore JSON parse errors and continue trying other fieldNames
              }
              // if other error, continue trying other fieldName or attempts
            } else {
              const successUrl = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/files/${UPLOAD_DIR}/${encodeURIComponent(uniqueFileName)}`;
              const successMsg = `POST upload succeeded with field='${fieldName}' and filename='${uniqueFileName}' url=${successUrl}`;
              console.log(successMsg);
              debug.push(successMsg);
              return { url: successUrl, debug };
            }
          } catch (e) {
            const throwMsg = `POST upload attempt #${attempt + 1} with field='${fieldName}' threw: ${String(e)}`;
            console.warn(throwMsg);
            debug.push(throwMsg);
          }
        }
      }

      const finalMsg = 'All POST fallback attempts failed after multiple filename retries';
      console.error(finalMsg);
      debug.push(finalMsg);
      return { url: null, debug };
    } catch (postErr) {
      const errMsg = `POST fallback upload failed (exception): ${String(postErr)}`;
      console.error(errMsg);
      debug.push(errMsg);
      return { url: null, debug };
    }
  } catch (err) {
    const errMsg = `Error uploading file to Backendless: ${String(err)}`;
    console.error(errMsg);
    debug.push(errMsg);
    return { url: null, debug };
  }
}
