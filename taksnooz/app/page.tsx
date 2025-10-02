"use client";

import { useState } from "react";
import { Board } from "../types/board";
import { Content } from "next/font/google";

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


export default function homePage() {
  const [board, setBoard] = useState<Board>(initialBoardData);

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
                      <p>{item.content}</p>
                    </div>
                  )}
                  
                </div>
              </div>
            );
          })
          }
        </div>
      </main>
    </div>
    
  );

}