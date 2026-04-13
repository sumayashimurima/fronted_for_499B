export default function Footer() {
  return (
    <footer className="bg-slate-50 w-full py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-lg font-bold text-slate-900 mb-4 font-headline">AGINTIC AI</div>
          <p className="font-body text-sm text-slate-500">
            Making premium education accessible through artificial intelligence.
          </p>
        </div>

        {/* Product */}
        <div>
          <h5 className="text-slate-900 font-bold mb-4 font-headline">Product</h5>
          <ul className="space-y-2">
            {['Features', 'Tutors', 'Curriculum'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-all duration-300 hover:underline decoration-red-500 underline-offset-4 text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-slate-900 font-bold mb-4 font-headline">Company</h5>
          <ul className="space-y-2">
            {['About Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-all duration-300 hover:underline decoration-red-500 underline-offset-4 text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-slate-900 font-bold mb-4 font-headline">Newsletter</h5>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white border border-slate-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="font-body text-sm text-slate-500">© 2024 Agintic AI. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">public</span>
          </a>
          <a href="#" className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
