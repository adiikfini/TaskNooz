// app/page.tsx
"use client";

import { useState } from "react";
import { Board, Item } from "../types/board";

// Data awal Board
const initialBoardData: Board = {
  columns: {
    "col-1": {
      id: "col-1",
      title: "Bank Ide",
      items: [
        { id: "item-1", content: "Video: Review Keyboard mechanical baru" },
        { id: "item-2", content: "Artikel: 5 Ekstensi VS Code Wajib untuk 2025",},
      ],
    },
    "col-2": {
      id: "col-2",
      title: "Riset & Scripting",
      items: [
        { id: "item-3", content: "Riset untuk video tutorial Next.js 15" },
      ],
    },"col-3": {
      id: "col-3",
      title: "Produksi/Rekaman",
      items: [],
    },"col-4": {
      id: "col-4",
      title: "Editing",
      items: [],
    },"col-5": {
      id: "col-5",
      title: "Sudah Publikasi",
      items: [],
    },
  },
  columnOrder: ['col-1', 'col-2','col-3','col-4','col-5',]
};

// Komponen baru untuk form tambah kartu
function AddCardForm({columnId, onAddCard, onCancel}:{ columnId: string, onAddCard: (columnId: string, content: string) => void; onCancel: () => void; }) {
  const [cardContent, setCardContent] = useState('');

  const handleAddClick = () =>{
    if(cardContent.trim()){
      onAddCard(columnId, cardContent.trim());
      setCardContent('');
    }
  }

  return(
    <div> 
      <textarea
        className="add-card-textarea mt-4"
        rows={3}
        placeholder="Masukan judul untuk kartu ini"
        value={cardContent}
        onChange={(e) => setCardContent(e.target.value)}
        autoFocus
      />
      <div className = "add-card-controls">
        <button onClick={handleAddClick} className="add-submit-btn">Tambah Kartu</button>
        <button onClick={onCancel} className="add-card-cancel-btn">&time;</button>
      </div>
    </div>
  )
}

//main
export default function homePage() {
  const [board, setBoard] = useState<Board>(initialBoardData);
  // State baru untuk melacak kolom mana yang sedang dalam mode "tambah kartu"
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);
  // Fungsi untuk menangani penambahan kartu baru
  const handleAddCard = (columnId: string, content: string) => {
    const newCard: Item = {
      id: `item-${Date.now()}`,
      content,
    }
    const newBoard = {...board };
    newBoard.columns[columnId].items.push(newCard);

    setBoard(newBoard);
    setAddingToColumn(null);
  }
  return(
    <div className = "h-screen flex flex-col">
      <header className ="bg-black/30 p-3">
      <h1 className="text-white text-x1 font-bold">TaskNooz</h1>
      </header>
      <main className="flex-1 p-4 overflow-hidden">
        <div className="h-full flex gap-4 overflow-x-auto">
          {board.columnOrder.map(columnId => {
            const column = board.columns[columnId];

            return(
              <div key= {column.id} className="bg-gray-100 rounded-lg p-2 w-72 flex-shink-0 h-fit">
                <h3 className="font-semibold text-gray-700 p-2">{column.title}</h3>

                <div className="space-y-2">
                  {column.items.map(item =>
                    <div key={item.id} className="bg-white rounded-b-md p-2 shadow"> 
                      <p className="text-sm text-gray-800">{item.content}</p>
                    </div>
                  )}
                </div>
                {/* Logika untuk menampilkan form atau tombol "Tambah Kartu" */}
                { addingToColumn === column.id ?(
                  <AddCardForm 
                    columnId={column.id}
                    onAddCard={handleAddCard}
                    onCancel={() => setAddingToColumn(null)}
                    />
                   ) : (
                    <button onClick={()=> setAddingToColumn(column.id)} className="add-card-btn">
                      + Tambah Kartu
                    </button>
                  )}
              </div>
            );
          })
          }
        </div>
      </main>
    </div>
    
  );

}