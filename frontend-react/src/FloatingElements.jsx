"use client"

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rotate-45 animate-float animation-delay-0"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500/30 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-3 h-8 bg-pink-500/30 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-cyan-500/30 rotate-12 animate-float animation-delay-3000"></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-yellow-500/40 rounded-full animate-float animation-delay-4000"></div>
      <div className="absolute top-80 right-1/3 w-4 h-4 bg-green-500/30 rotate-45 animate-float animation-delay-5000"></div>

      {/* Larger Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-sm animate-float-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-sm animate-float-slow animation-delay-3000"></div>
    </div>
  )
}
