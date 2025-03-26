'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Clock, Download, Loader2, Trash2 } from 'lucide-react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/contexts/AuthContext'
import { RunHistoryDoc } from '@/types/firebase'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function HistoryPanel() {
  const { user } = useAuth()

  const [historyItems, setHistoryItems] = useState<RunHistoryDoc[]>([])
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const downloadImage = async (imageUrl: string) => {
    try {
      setIsDownloading(imageUrl)
      // Instead of fetching directly, use a proxy API route
      const response = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Extract a better filename from the original URL
      const filename = 'image.png'

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    } finally {
      setIsDownloading(null)
    }
  }

  useEffect(() => {
    if (!user) return

    const fetchHistory = async () => {
      const userRef = await doc(db, 'users', user.uid)

      const historyRef = collection(db, 'runHistory')
      const q = query(
        historyRef,
        where('userRef', '==', userRef),
        where('runType', '==', 'ui'),
        orderBy('timestamp', 'desc'),
      )

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const history = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as RunHistoryDoc[]
        setHistoryItems(history)
      })

      return unsubscribe
    }

    const unsubscribe = fetchHistory()

    return () => {
      unsubscribe.then((unsub) => unsub && unsub())
    }
  }, [user])

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const deleteHistoryItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'runHistory', id))
      setHistoryItems(historyItems.filter((item) => item.id !== id))
      toast.success('Image deleted successfully')
    } catch (error) {
      console.error('Error deleting document:', error)
      toast.error('Failed to delete image')
    }
  }

  return (
    <>
      <div className="flex w-[200px] flex-col border-l border-slate-800 bg-slate-800/30 xl:w-[280px]">
        <div className="flex items-center border-b border-slate-800 p-4">
          <Clock className="mr-2 h-4 w-4 text-slate-400" />
          <h3 className="font-medium">Recent Images</h3>
        </div>

        <div className="max-h-[calc(100vh-10rem)] flex-1 overflow-y-auto">
          {historyItems.length > 0 ? (
            <div className="divide-y divide-slate-800">
              {historyItems.map(
                (item) =>
                  item.outputData?.inpaintedImageUrl && (
                    <div
                      key={item.id}
                      className="p-4 transition-colors hover:bg-slate-800/50"
                    >
                      <div className="relative mb-2 aspect-square overflow-hidden rounded-md border border-slate-700">
                        <Image
                          src={item.outputData?.inpaintedImageUrl || ''}
                          alt={`History item ${item.id}`}
                          fill
                          sizes="300px"
                          className="object-cover"
                        />
                        {isDownloading ===
                          item.outputData?.inpaintedImageUrl && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.inputData.mode}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-slate-700"
                            onClick={() =>
                              downloadImage(
                                item.outputData?.inpaintedImageUrl || '',
                              )
                            }
                            disabled={
                              isDownloading ===
                              item.outputData?.inpaintedImageUrl
                            }
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-slate-700"
                            onClick={() => handleDeleteClick(item.id)}
                            disabled={
                              isDownloading ===
                              item.outputData?.inpaintedImageUrl
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <p>No recent images</p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => itemToDelete && deleteHistoryItem(itemToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
