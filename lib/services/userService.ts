import { supabase } from '@/lib/supabase'
import { User } from 'firebase/auth'
import firebase from 'firebase/compat/app'

type FirebaseUser = User | firebase.User

export async function syncUserToDatabase(firebaseUser: FirebaseUser) {
  try {
    const {
      uid,
      email,
      emailVerified,
      photoURL,
      displayName,
      phoneNumber,
      providerData,
    } = firebaseUser

    const authProvider = providerData?.[0]?.providerId || 'unknown'

    const userData = {
      id: uid,
      email: email || null,
      auth_provider: authProvider.replace('.com', ''),
      is_email_verified: emailVerified || false,
      is_disabled: false,
      is_banned: false,
      mfa_enabled: false,
      display_name: displayName || null,
      photo_url: photoURL || null,
      phone_number: phoneNumber || null,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }

    // Try insert first
    const { error: insertError } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()

    // If insert fails due to unique violation, try update
    if (insertError && insertError.code === '23505') {
      const { error: updateError, data } = await supabase
        .from('users')
        .update(userData)
        .eq('id', uid)
        .select()

      if (updateError) {
        return { success: false, error: updateError }
      }

      return { success: true, data }
    }

    if (insertError && insertError.code !== '23505') {
      return { success: false, error: insertError }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
} 