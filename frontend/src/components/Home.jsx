import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Lock, ShieldCheck, Cpu, Fingerprint, DownloadCloud, CheckCircle, MailOpen, Github, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <main className="bg-[#0a0c0e] text-white font-sans scroll-smooth font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#0a0c0e]/80 backdrop-blur-lg border-b border-gray-800/50 fixed top-0 left-0 z-50">
        <div className="text-white text-2xl font-extrabold tracking-tight">
          PrivateGPT Snapshot
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-200 hover:text-white hover:border-cyan-500 bg-gradient-to-r from-gray-800/20 to-gray-900/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20"
          >
            Register
        </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-black opacity-50 pointer-events-none animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10 pointer-events-none" />

        {/* Main Content */}
        <div className="max-w-5xl z-10" data-aos="fade-up">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="text-cyan-400 w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text tracking-tight">
            PrivateGPT Snapshot
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Your privacy-first AI companion. Redact and encrypt sensitive data locally for ultimate security.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-6 flex-wrap mb-8">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/30 active:scale-95">
              <Lock className="w-5 h-5" />
              Try Now
            </button>
            <button className="px-8 py-4 border border-gray-600 hover:border-cyan-400 text-gray-200 hover:text-white transition-all duration-300 rounded-xl flex items-center gap-3 bg-gray-900/30 hover:bg-gray-900/50">
              <DownloadCloud className="w-5 h-5" />
              Learn More
            </button>
          </div>

          {/* Benefits */}
          <div className="text-gray-300 text-sm md:text-base space-y-3 mb-12">
            <p className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" /> Works offline
              <span className="text-gray-500 mx-2">•</span>
              100% open-source
              <span className="text-gray-500 mx-2">•</span>
              Built for privacy
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
            {[
              {
                title: 'Local Encryption',
                desc: 'Sensitive data is AES-encrypted locally before processing.',
                icon: <Lock className="text-cyan-400 w-6 h-6" />,
              },
              {
                title: 'Zero Data Sharing',
                desc: 'No logs, no tracking, no data storage. Your inputs stay private.',
                icon: <ShieldCheck className="text-cyan-400 w-6 h-6" />,
              },
              {
                title: 'Universal Compatibility',
                desc: 'Seamlessly integrates with ChatGPT, Claude, or any LLM.',
                icon: <DownloadCloud className="text-cyan-400 w-6 h-6" />,
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#121416]/80 p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                {icon}
                <div>
                  <h4 className="text-white font-semibold text-lg">{title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Privacy Matters */}
      <section className="px-6 py-28 bg-[#0c0e10]">
        <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Why Privacy Matters
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
            Unleash AI's potential without compromising your data. PrivateGPT Snapshot keeps everything local and secure.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: Shield,
                title: 'Full Local Processing',
                desc: 'Redaction and encryption happen entirely in your browser.',
              },
              {
                icon: Fingerprint,
                title: 'Zero Tracking',
                desc: 'We don’t track, log, or store your inputs. Your privacy is our priority.',
              },
              {
                icon: Cpu,
                title: 'Universal AI Support',
                desc: 'Works with any LLM, ensuring privacy across platforms.',
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-[#121416]/80 p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={idx * 200}
              >
                <Icon className="text-cyan-400 w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-28 bg-[#0a0c0e]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text" data-aos="fade-up">
            What You Get
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            {[
              'Live Redaction Engine',
              'Local AES Encryption',
              'Customizable Sensitivity',
              'Sleek Dark Mode UI',
              'Offline First',
              'Open Source Code',
              'Chrome Plugin (Soon)',
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#121416]/80 p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/10 backdrop-blur-sm"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <CheckCircle className="text-cyan-400 w-6 h-6 mb-3" />
                <p className="text-gray-200 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0c0e10] px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text" data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do you store any of my data?',
                a: 'No. All processing is done locally in your browser. We never store or transmit your inputs.',
              },
              {
                q: 'Is it open source?',
                a: 'Yes! The entire project is hosted on GitHub. You can audit or contribute anytime.',
              },
              {
                q: 'Can I use this with other AI models?',
                a: 'Absolutely. It works with any AI that accepts text input, including Claude, Gemini, and open models.',
              },
            ].map(({ q, a }, i) => (
              <details
                key={i}
                className="bg-[#121416]/80 p-5 rounded-2xl border border-gray-700/50 hover:border-cyan-600/50 transition-all duration-300 backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={i * 200}
              >
                <summary className="cursor-pointer font-semibold text-lg text-cyan-300 hover:text-cyan-200 transition-colors">
                  {q}
                </summary>
                <p className="text-gray-300 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0a0c0e] px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text" data-aos="fade-up">
          Stay Updated
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="150">
          Subscribe for early access, feature updates, and exclusive insights.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="200">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-5 py-3 rounded-xl bg-[#121416]/80 border border-gray-600 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20"
          >
            <MailOpen className="w-5 h-5" />
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#08090a] text-center px-6 py-12">
        <p className="text-gray-300 mb-3 text-sm">
          Built with ❤️ & privacy by Abhishek Bhonde
        </p>
        <a
          href="https://github.com/abhishekbhonde"
          target="_blank"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Github className="w-5 h-5" /> GitHub
        </a>
      </footer>

      {/* Tailwind Animation for Gradient */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </main>
  );
}