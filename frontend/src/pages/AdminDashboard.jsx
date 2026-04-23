import React, { useState } from 'react';
import EventManager from '../components/EventManager';
import StoryManager from '../components/StoryManager';
import FeedbackManager from '../components/FeedbackManager';
import VideoManager from '../components/VideoManager';
import {
  Calendar,
  BookOpen,
  Youtube,
  MessageSquare,
  Settings,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const tabs = [
  { id: 'events',   icon: Calendar,       label: 'Events & Offers',  desc: 'Manage events and promotional offers' },
  { id: 'story',    icon: BookOpen,        label: 'Our Story',        desc: 'Edit title and description' },
  { id: 'videos',   icon: Youtube,         label: 'YouTube Shorts',   desc: 'Manage video links' },
  { id: 'feedback', icon: MessageSquare,   label: 'Guest Reviews',    desc: 'Moderate guest feedback' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const current = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#07100d]">
      <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col lg:flex-row">

        {/* ── Sidebar ── */}
        <aside className="hidden w-72 xl:w-80 border-r border-white/6 bg-luxury-bg/80 backdrop-blur-2xl px-5 py-8 lg:flex lg:flex-col">
          {/* Brand */}
          <div className="mb-10 px-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center">
                <Sparkles size={18} className="text-luxury-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold/60">Admin</p>
                <h1 className="font-serif text-xl text-luxury-cream">Estilo Mansa</h1>
              </div>
            </div>
            <p className="text-luxury-text/40 text-xs leading-6">Control centre for your luxury homestay.</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6 mb-6" />

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            <p className="text-[9px] uppercase tracking-[0.35em] text-luxury-text/25 px-3 mb-3">Content Management</p>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-300 group ${
                    isActive
                      ? 'bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold'
                      : 'text-luxury-text/50 hover:bg-white/4 hover:text-luxury-cream border border-transparent'
                  }`}
                >
                  <Icon size={17} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tab.label}</p>
                    <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-luxury-gold/50' : 'text-luxury-text/30'}`}>
                      {tab.desc}
                    </p>
                  </div>
                  {isActive && <ChevronRight size={14} className="flex-shrink-0" />}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/6">
            <div className="flex items-center gap-3 px-3">
              <div className="w-9 h-9 rounded-full bg-luxury-dark border border-luxury-gold/20 flex items-center justify-center">
                <Settings size={15} className="text-luxury-gold" />
              </div>
              <div>
                <p className="text-luxury-cream text-xs font-medium">Administrator</p>
                <p className="text-luxury-text/30 text-[9px] tracking-widest uppercase">Master Access</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto">
          {/* Header bar */}
          <div className="sticky top-0 z-30 bg-luxury-bg/90 backdrop-blur-xl border-b border-white/6 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold/60 mb-0.5">
                  {current?.desc}
                </p>
                <h2 className="font-serif text-xl md:text-2xl text-luxury-cream">{current?.label}</h2>
              </div>

              {/* Mobile tab pills */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar lg:hidden">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all ${
                        activeTab === tab.id
                          ? 'bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold'
                          : 'border border-white/8 text-luxury-text/50'
                      }`}
                    >
                      <Icon size={12} />
                      {tab.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-7 lg:p-10">
            <div className="max-w-5xl mx-auto">
              {activeTab === 'events'   && <EventManager />}
              {activeTab === 'story'    && <StoryManager />}
              {activeTab === 'videos'   && <VideoManager />}
              {activeTab === 'feedback' && <FeedbackManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
