'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { doc, onSnapshot, where } from 'firebase/firestore'
import {
  db,
  generateUserApiKey,
  listModelVersions,
  revokeUserApiKey,
} from '@/lib/firebase/client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Book, Copy, Key, KeyIcon, Plus, RefreshCw, Trash } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { collection, query, orderBy, limit } from 'firebase/firestore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ModelVersion, RunHistoryDoc } from '@/types/firebase'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import Image from 'next/image'

export default function APIPage() {
  const t = useTranslations()
  const { user, apiKey } = useAuth()

  const [loading, setLoading] = useState(false)

  const [modelVersions, setModelVersions] = useState<ModelVersion[]>([])
  const [recentRequests, setRecentRequests] = useState<RunHistoryDoc[]>([])
  const [loadingStats, setLoadingStats] = useState(false)

  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false)

  useEffect(() => {
    if (user?.uid) {
      fetchModelVersions()
      const unsubscribe = fetchHistory()

      return () => {
        unsubscribe.then((unsub) => unsub && unsub())
      }
    }
  }, [user])

  const fetchModelVersions = async () => {
    const response = await listModelVersions({ product: 'watermark' })
    setModelVersions(response.data.versions)
  }

  const fetchHistory = async () => {
    if (!user?.uid) return

    const userRef = await doc(db, 'users', user.uid)

    const historyRef = collection(db, 'runHistory')
    const q = query(
      historyRef,
      where('userRef', '==', userRef),
      where('runType', '==', 'api'),
      orderBy('timestamp', 'desc'),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      }) as RunHistoryDoc[]
      setRecentRequests(history)
    })

    return unsubscribe
  }

  const generateApiKey = async () => {
    if (!user?.uid) return

    setLoading(true)
    try {
      await generateUserApiKey({
        modelVersionId: modelVersions[0].id,
      })
      toast.success(t('dashboard.api.keyGenerated'))
    } catch (error) {
      console.error('Error generating API key:', error)
      toast.error(t('dashboard.api.keyGenerationError'))
    } finally {
      setLoading(false)
    }
  }

  const revokeApiKey = async () => {
    if (!user?.uid) return

    setLoading(true)
    try {
      await revokeUserApiKey({
        apiKey: user.apiKey || '',
      })
      toast.success(t('dashboard.api.keyRevoked'))
    } catch (error) {
      console.error('Error revoking API key:', error)
      toast.error(t('dashboard.api.keyRevocationError'))
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(t('dashboard.api.copied'))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  return (
    <>
      <div className="overflow-y-auto">
        <div className="container mx-auto max-w-screen-lg py-8">
          <div className="rounded-lg bg-slate-900 p-6">
            {/* API Key Management Section */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <KeyIcon className="h-6 w-6 text-slate-400" />
                <h1 className="text-2xl font-bold text-white">
                  {t('dashboard.api.title')}
                </h1>
              </div>

              <div className="mb-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="flex flex-1 items-center justify-between rounded bg-slate-800 p-2 font-mono">
                      {apiKey
                        ? apiKey?.slice(0, 3) + '..........' + apiKey?.slice(-6)
                        : 'No API key'}
                      <Button
                        className="size-6"
                        variant="outline-blue"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey || '')}
                        disabled={loading || !apiKey}
                      >
                        <Copy className="size-3" />
                      </Button>
                    </code>

                    {apiKey ? (
                      <Button
                        variant="blue"
                        size="icon"
                        onClick={() => setIsRegenerateDialogOpen(true)}
                        disabled={loading}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="blue"
                        size="icon"
                        onClick={generateApiKey}
                        disabled={loading}
                      >
                        <Plus className={`h-4 w-4`} />
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setIsRevokeDialogOpen(true)}
                      disabled={loading || !apiKey}
                    >
                      <Trash className={`h-4 w-4`} />
                    </Button>
                  </div>
                  {apiKey && recentRequests[0] && (
                    <div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-800/30 px-4 py-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          {t('dashboard.api.lastUsed')}:
                        </span>
                        <span className="font-medium text-white">
                          {formatTimeAgo(
                            new Date(recentRequests[0]?.timestamp || ''),
                          )}{' '}
                          from {recentRequests[0]?.ipAddress || '102.168.1.1'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* API Usage Statistics Section */}
            <div className="mt-8 rounded-lg bg-slate-900 p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
                {t('dashboard.api.usageStats')}
              </h2>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-800 p-4">
                  <p className="text-sm text-slate-400">
                    {t('dashboard.api.totalRequests')}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {recentRequests.length}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 p-4">
                  <p className="text-sm text-slate-400">
                    {t('dashboard.api.successfulRequests')}
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    {
                      recentRequests.filter(
                        (item) => item.status === 'completed',
                      ).length
                    }
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 p-4">
                  <p className="text-sm text-slate-400">
                    {t('dashboard.api.failedRequests')}
                  </p>
                  <p className="text-2xl font-bold text-red-500">
                    {
                      recentRequests.filter((item) => item.status === 'failed')
                        .length
                    }
                  </p>
                </div>
              </div>

              {/* Recent API Requests Table */}
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-medium text-white">
                  {t('dashboard.api.recentRequests')}
                </h3>

                {loadingStats ? (
                  <div className="flex justify-center p-8">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  </div>
                ) : recentRequests.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border border-slate-800">
                    <table className="w-full">
                      <thead className="bg-slate-800/70">
                        <tr>
                          <th className="p-3 text-left text-sm font-medium text-slate-300"></th>
                          <th className="p-3 text-left text-sm font-medium text-slate-300">
                            {t('dashboard.api.timestamp')}
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-slate-300">
                            {t('dashboard.api.status')}
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-slate-300">
                            {t('dashboard.api.ipAddress')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {recentRequests.map((request, index) => (
                          <tr key={index} className="hover:bg-slate-800/50">
                            <td className="p-3 text-sm text-slate-300">
                              <Image
                                src={
                                  request.outputData?.inpaintedImageUrl || ''
                                }
                                alt={`History item ${request.id}`}
                                width={30}
                                height={30}
                                className="object-cover"
                              />
                            </td>
                            <td className="p-3 text-sm text-slate-300">
                              {new Date(request.timestamp).toLocaleString()}
                            </td>
                            <td className="p-3 text-sm">
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                  request.status === 'completed'
                                    ? 'bg-green-500/20 text-green-400'
                                    : request.status === 'failed'
                                      ? 'bg-red-500/20 text-red-400'
                                      : 'bg-yellow-500/20 text-yellow-400'
                                }`}
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="p-3 text-sm text-slate-300">
                              {request.ipAddress}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-8 text-center">
                    <p className="text-slate-400">
                      {t('dashboard.api.noRequests')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="my-12 border-b border-slate-800" />

            {/* API Documentation Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Book className="h-6 w-6 text-slate-400" />
                <h2 className="text-xl font-semibold text-white">
                  {t('dashboard.api.documentation')}
                </h2>
                <div className="flex gap-1">
                  {modelVersions.map((version) => (
                    <Badge key={version.id} variant="secondary">
                      v{version.version}
                    </Badge>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="auto" className="space-y-6">
                <TabsList className="grid h-10 w-full grid-cols-2 rounded-sm border border-slate-800 py-0.5">
                  <TabsTrigger value="auto" className="rounded-sm py-1">
                    {t('dashboard.api.autoMask')}
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="rounded-sm py-1">
                    {t('dashboard.api.manualMask')}
                  </TabsTrigger>
                </TabsList>

                {/* Auto Mask Tab */}
                <TabsContent value="auto" className="space-y-4">
                  <Alert>
                    <AlertTitle>{t('dashboard.api.endpoint')}</AlertTitle>
                    <AlertDescription>
                      <code className="text-sm">
                        POST
                        https://processautomaskwatermark-k677kyuleq-uc.a.run.app
                      </code>
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-lg border border-slate-800 p-4">
                    <h4 className="mb-2 font-medium text-white">
                      {t('dashboard.api.requestFormat')}
                    </h4>
                    <pre className="mt-2 rounded bg-slate-800 p-2 text-sm">
                      <code>
                        {`{
  "version": "string", // ${modelVersions.map((v) => v.version).join(', ')}
  "imageBase64": "base64_encoded_image_data"
}`}
                      </code>
                    </pre>
                  </div>

                  <div className="rounded-lg border border-slate-800 p-4">
                    <h4 className="mb-2 font-medium text-white">
                      {t('dashboard.api.response')}
                    </h4>
                    <pre className="mt-2 rounded bg-slate-800 p-2 text-sm">
                      <code>
                        {`{
  "success": boolean,
  "inpaintedImageUrl": "string" // URL to the processed image
}`}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                {/* Manual Mask Tab */}
                <TabsContent value="manual" className="space-y-4">
                  <Alert>
                    <AlertTitle>{t('dashboard.api.endpoint')}</AlertTitle>
                    <AlertDescription>
                      <code className="text-sm">
                        POST
                        https://processmanualmaskwatermark-k677kyuleq-uc.a.run.app
                      </code>
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-lg border border-slate-800 p-4">
                    <h4 className="mb-2 font-medium text-white">
                      {t('dashboard.api.requestFormat')}
                    </h4>
                    <pre className="mt-2 rounded bg-slate-800 p-2 text-sm">
                      <code>
                        {`{
  "version": "string", // ${modelVersions.map((v) => v.version).join(', ')}
  "imageBase64": "base64_encoded_image_data",
  "maskBase64": "base64_encoded_mask_data" // optional
}`}
                      </code>
                    </pre>
                  </div>

                  <div className="rounded-lg border border-slate-800 p-4">
                    <h4 className="mb-2 font-medium text-white">
                      {t('dashboard.api.response')}
                    </h4>
                    <pre className="mt-2 rounded bg-slate-800 p-2 text-sm">
                      <code>
                        {`{
  "success": boolean,
  "inpaintedImageUrl": "string" // URL to the processed image
}`}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                {/* Common Authentication Section - Outside Tabs */}
                <div className="mt-8 rounded-lg border border-slate-800 p-4">
                  <h3 className="mb-2 font-medium text-white">
                    {t('dashboard.api.authentication')}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {t('dashboard.api.authDescription')}
                  </p>
                  <pre className="mt-2 rounded bg-slate-800 p-2 text-sm">
                    <code>{`x-api-key: YOUR_API_KEY`}</code>
                  </pre>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog
        open={isRevokeDialogOpen}
        onOpenChange={setIsRevokeDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Revocation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke your API key? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={revokeApiKey}>
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isRegenerateDialogOpen}
        onOpenChange={setIsRegenerateDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Regeneration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to regenerate your API key? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="default" onClick={generateApiKey}>
              Regenerate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
