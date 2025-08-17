import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useNewsletterStats = () => {
  const [readerCount, setReaderCount] = useState(90000) // Valeur par défaut
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('newsletter_stats')
          .select('total_readers')
          .eq('id', 'main')
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Erreur lors de la récupération des stats:', error)
          return
        }

        if (data) {
          setReaderCount(data.total_readers)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Écouter les changements en temps réel
    const subscription = supabase
      .channel('newsletter_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'newsletter_stats',
        },
        (payload) => {
          if (payload.new && 'total_readers' in payload.new) {
            setReaderCount(payload.new.total_readers as number)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { readerCount, isLoading }
}