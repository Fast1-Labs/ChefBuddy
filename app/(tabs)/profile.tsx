import { Session } from '@supabase/supabase-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { View, Alert, Dimensions, Button } from 'react-native';

import { supabase } from '../../utils/supabase';

import FormInput from '~/components/FormInput';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, phone,email`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setPhone(data.phone);
        setEmail(data.email);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    phone,
    email,
  }: {
    username: string;
    phone: string;
    email: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        phone,
        email,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        style={{ height: Dimensions.get('window').height, flex: 1 }}>
        <FormInput title="Email" input={email} onInputChange={() => setEmail} />
        <Button
          title="Update Profile"
          onPress={() => updateProfile({ username, phone, email })}
          disabled={loading}
        />
      </LinearGradient>
    </View>
  );
}
