export const SeedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
    >
        <path d="M12 2C8 2 6 6 6 9c0 4 6 13 6 13s6-9 6-13c0-3-2-7-6-7z" />
    </svg>
)

export const RoseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        {...props}
    >
        <path d="M12 21c-3.18 0-5.76-2.58-9-5.24a8.17 8.17 0 0 1-2.92-5.72C.08 7.39 2 5.09 5.09 5.09c1.93 0 3.73 1.48 5.41 3.51 1.68-2.03 3.48-3.51 5.41-3.51C19 5.09 21.92 6.89 22.92 9.04a8.17 8.17 0 0 1-2.92 5.72C17.76 17.42 15.18 20 12 21Z" fill="currentColor" stroke="none" />
    </svg>
)

// A simple tree structure (trunk + branches)
export const TreeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        {...props}
    >
        {/* Trunk */}
        <path d="M50 100 L50 40" strokeWidth="6" className="tree-trunk" />
        {/* Left Branches */}
        <path d="M50 80 L20 60" className="tree-branch branch-left-1" />
        <path d="M50 60 L15 35" className="tree-branch branch-left-2" />
        <path d="M50 40 L25 10" className="tree-branch branch-left-3" />
        {/* Right Branches */}
        <path d="M50 80 L80 60" className="tree-branch branch-right-1" />
        <path d="M50 60 L85 35" className="tree-branch branch-right-2" />
        <path d="M50 40 L75 10" className="tree-branch branch-right-3" />
    </svg>
)
