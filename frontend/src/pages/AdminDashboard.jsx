import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroManager from '../components/HeroManager';
import EventManager from '../components/EventManager';
import StoryManager from '../components/StoryManager';
import GalleryManager from '../components/GalleryManager';
import FeedbackManager from '../components/FeedbackManager';
import VideoManager from '../components/VideoManager';
import RoomManager from '../components/RoomManager';
import {
  LayoutDashboard,
  Hotel,
  Calendar,
  Image as ImageIcon,
  Youtube,
  MessageSquare,
  BookOpen,
  Settings,
} from 'lucide-react';
import { LoadingScreen } from '../components/ui';

const AdminDashboard = () => {
  const [tab, setTab] = useState('rooms');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return null;

  const tabs = [
    { id: 'rooms', icon: Hotel, label: 'Rooms & Media' },
    { id: 'events', icon: Calendar, label: 'Events & Offers' },
    { id: 'hero', icon: LayoutDashboard, label: 'Hero Carousel' },
    { id: 'story', icon: BookOpen, label: 'Our Story' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery & Highlights' },
    { id: 'videos', icon: Youtube, label: 'YouTube Shorts' },
    { id: 'feedback', icon: MessageSquare, label: 'Guest Reviews' },
  ];

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`w-full flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-left transition-all ${
        tab === id
          ? 'bg-luxury-gold/12 text-luxury-gold shadow-[0_12px_30px_rgba(200,169,110,0.08)]'
          : 'text-gray-500 hover:bg-black/[0.025] hover:text-gray-800'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#eef2ef]">
      <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col lg:flex-row">
        <aside className="hidden w-80 border-r border-black/6 bg-white px-6 py-8 lg:block">
          <div className="panel-soft mb-8 px-5 py-5">
            <p className="section-label mb-3">Management Suite</p>
            <h1 className="text-3xl font-serif font-semibold text-luxury-dark">Estilo Mansa</h1>
            <p className="mt-3 text-sm leading-7 text-gray-500">A polished control center for rooms, media, and story-led content.</p>
          </div>

          <nav className="space-y-2">
            <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">Operations</div>
            {tabs.slice(0, 2).map(item => <SidebarItem key={item.id} {...item} />)}
            <div className="px-2 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">Website Content</div>
            {tabs.slice(2).map(item => <SidebarItem key={item.id} {...item} />)}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 xl:p-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="panel mb-8 overflow-hidden rounded-[2rem] px-5 py-6 sm:px-6 sm:py-7 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="section-label mb-3">Administrator Workspace</p>
                  <h2 className="text-3xl font-bold capitalize text-gray-900 sm:text-4xl">{tab.replace('_', ' ')}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">Administrative control panel for your homestay, designed for fast updates and calm navigation.</p>
                </div>
                <div className="flex items-center gap-3 self-start lg:self-auto">
                  <div className="hidden text-right md:block">
                    <p className="text-sm font-bold text-gray-800">Administrator</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Master Access</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-luxury-dark text-luxury-gold shadow-lg">
                    <Settings size={24} />
                  </div>
                </div>
              </div>

              <div className="hide-scrollbar -mx-1 mt-6 flex gap-3 overflow-x-auto px-1 pb-1 lg:hidden">
                {tabs.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all ${
                        tab === item.id
                          ? 'border-luxury-gold/24 bg-luxury-gold/12 text-luxury-gold'
                          : 'border-black/8 bg-white/50 text-gray-500'
                      }`}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="animate-fade-in">
              {tab === 'rooms' && <RoomManager />}
              {tab === 'events' && <EventManager />}
              {tab === 'hero' && <HeroManager />}
              {tab === 'story' && <StoryManager />}
              {tab === 'gallery' && <GalleryManager />}
              {tab === 'videos' && <VideoManager />}
              {tab === 'feedback' && <FeedbackManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
