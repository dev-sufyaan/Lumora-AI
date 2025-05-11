/**
 * Smoothly scrolls to a specific section on the page
 * @param id - The ID of the section to scroll to
 */
export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    // Add offset for the navbar height (adjust the 100 value as needed)
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    // Force a repaint before scrolling to prevent visual glitches
    document.body.style.willChange = 'scroll-position';
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Reset after scrolling completes
    setTimeout(() => {
      document.body.style.willChange = 'auto';
    }, 500);
  }
};
