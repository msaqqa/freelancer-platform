'use client';

import { Container } from '@/components/common/container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
          <div className="flex order-2 md:order-1  gap-2 font-normal text-sm flex-1 justify-center">
            <span className="text-muted-foreground">
              All Right Saved {currentYear} &copy;
            </span>
            <span className="text-secondary-foreground hover:text-primary">
              Bright Gaza
            </span>
          </div>
          {/* <nav className="flex order-1 md:order-2 gap-4 font-normal text-sm text-muted-foreground">
            <a
              href={generalSettings.docsLink}
              target="_blank"
              className="hover:text-primary"
            >
              Docs
            </a>
          </nav> */}
        </div>
      </Container>
    </footer>
  );
}
