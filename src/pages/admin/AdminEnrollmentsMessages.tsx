"use client";

import React, { useState, useEffect } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText, UserCheck } from 'lucide-react';
import AdminEnrollmentCard from '@/components/AdminEnrollmentCard';
import AdminMessageCard from '@/components/AdminMessageCard';

interface Admission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  program: string;
  terms: boolean;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminEnrollmentsMessages = () => {
  const [enrollments, setEnrollments] = useState<Admission[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrollments');

  const fetchEnrollments = async () => {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching enrollments:', error);
      toast.error('Failed to load enrollments.');
    } else {
      setEnrollments(data as Admission[]);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages.');
    } else {
      setMessages(data as ContactMessage[]);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchEnrollments(), fetchMessages()]).finally(() => setLoading(false));
  }, []);

  const handleDeleteEnrollment = async (id: string) => {
    const { error } = await supabase
      .from('admissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting enrollment:', error);
      toast.error('Failed to delete enrollment.');
    } else {
      setEnrollments(prev => prev.filter(item => item.id !== id));
      toast.success('Enrollment deleted successfully!');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message.');
    } else {
      setMessages(prev => prev.filter(item => item.id !== id));
      toast.success('Message deleted successfully!');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <AdminHeader pageTitle="Enrollments & Messages" />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-text-medium font-body text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Enrollments & Messages" />
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            Manage Enrollments & Messages
          </h2>
        </AnimateOnScroll>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrollments" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" /> Enrollments ({enrollments.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4" /> Messages ({messages.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="enrollments" className="mt-6">
            {enrollments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment, index) => (
                  <AnimateOnScroll key={enrollment.id} delay={200 + index * 50}>
                    <AdminEnrollmentCard enrollment={enrollment} onDelete={handleDeleteEnrollment} />
                  </AnimateOnScroll>
                ))}
              </div>
            ) : (
              <AnimateOnScroll delay={200}>
                <p className="text-text-medium font-body text-gray-600 text-center">
                  No enrollments found.
                </p>
              </AnimateOnScroll>
            )}
          </TabsContent>
          <TabsContent value="messages" className="mt-6">
            {messages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((message, index) => (
                  <AnimateOnScroll key={message.id} delay={200 + index * 50}>
                    <AdminMessageCard message={message} onDelete={handleDeleteMessage} />
                  </AnimateOnScroll>
                ))}
              </div>
            ) : (
              <AnimateOnScroll delay={200}>
                <p className="text-text-medium font-body text-gray-600 text-center">
                  No messages found.
                </p>
              </AnimateOnScroll>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminEnrollmentsMessages;