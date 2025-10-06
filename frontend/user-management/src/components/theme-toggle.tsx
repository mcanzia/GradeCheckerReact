"use client";

import { useThemeStore } from "@/store/theme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-800 text-white"
        >
            Current: {theme} → Toggle
        </button>
    );
}
