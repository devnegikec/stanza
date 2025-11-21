import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Edit3, Send, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Social Scheduler
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/editor">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Write. Schedule. Sell.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The only social media scheduler built for <span className="font-semibold text-blue-600">tech founders</span> who write to sell.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Link href="/editor">
                <Edit3 className="w-5 h-5 mr-2" />
                Start Writing
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <Edit3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zen-Mode Editor</h3>
              <p className="text-gray-600 leading-relaxed">
                Distraction-free writing experience with real-time character counter and thread preview. Focus on what matters: your message.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule posts with drag-and-drop calendar. Our Redis-powered queue ensures your content goes live exactly when you want.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Founders</h3>
              <p className="text-gray-600 leading-relaxed">
                Not a marketing manager? Perfect. Clean interface, thread management, and mobile preview for X and LinkedIn.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to write content that sells?
              </h2>
              <p className="text-xl text-blue-100">
                Join tech founders who are building their audience and generating leads through social media.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link href="/editor">
                  <Send className="w-5 h-5 mr-2" />
                  Create Your First Post
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            Built for tech founders. Inspired by{' '}
            <a href="https://typefully.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Typefully
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
