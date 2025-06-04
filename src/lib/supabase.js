import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User management functions
export const userService = {
  // Get current user profile
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return { data, error }
  },

  // Update user profile
  async updateProfile(updates) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    return { data, error }
  },

  // Generate and set username
  async generateUsername(fullName) {
    const { data, error } = await supabase
      .rpc('generate_username', { base_name: fullName })

    return { data, error }
  },

  // Update online status
  async updateOnlineStatus(isOnline) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .rpc('update_user_online_status', {
        user_uuid: user.id,
        online_status: isOnline
      })

    return { error }
  },

  // Get user profile with stats
  async getUserProfileWithStats(userId) {
    const { data, error } = await supabase
      .rpc('get_user_profile', { user_uuid: userId })

    return { data: data?.[0], error }
  }
}

// Message functions
export const messageService = {
  // Send message with user info
  async sendMessage(content) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    // Get user profile
    const { data: userProfile } = await userService.getCurrentUserProfile()

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          content: content.trim(),
          username: userProfile?.username || userProfile?.full_name || 'Anonymous',
          user_id: user.id,
          avatar_url: userProfile?.avatar_url
        }
      ])
      .select()

    return { data, error }
  },

  // Get messages with user info
  async getMessages(limit = 50) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        users (
          username,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: true })
      .limit(limit)

    return { data, error }
  }
}