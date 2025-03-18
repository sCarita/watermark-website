'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, Download, Trash2 } from 'lucide-react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/contexts/AuthContext'
import { RunHistoryDoc } from '@/types/firebase'

export function HistoryPanel() {
  const { user } = useAuth()
  const [historyItems, setHistoryItems] = useState<RunHistoryDoc[]>([])

  useEffect(() => {
    if (!user) return

    const historyRef = collection(db, 'runHistory')
    const q = query(
      historyRef,
      where('userRef', '==', `/users/${user.uid}`),
      orderBy('timestamp', 'desc'),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RunHistoryDoc[]
      setHistoryItems(history)
    })

    return () => unsubscribe()
  }, [user])

  const deleteHistoryItem = (id: string) => {
    setHistoryItems(historyItems.filter((item) => item.id !== id))
  }

  return (
    <div className="flex w-[280px] flex-col border-l border-slate-800 bg-slate-800/30">
      <div className="flex items-center border-b border-slate-800 p-4">
        <Clock className="mr-2 h-4 w-4 text-slate-400" />
        <h3 className="font-medium">Recent Images</h3>
      </div>

      <div className="max-h-[calc(100vh-10rem)] flex-1 overflow-y-auto">
        {historyItems.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="p-4 transition-colors hover:bg-slate-800/50"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-md border border-slate-700">
                  <Image
                    src={item.inputData.imageBase64 || '/placeholder.svg'}
                    alt={`History item ${item.id}`}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.inputData.mode}</p>
                    <p className="text-xs text-slate-400">{item.timestamp}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-slate-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-slate-700"
                      onClick={() => deleteHistoryItem(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <p>No recent images</p>
          </div>
        )}
      </div>
    </div>
  )
}
