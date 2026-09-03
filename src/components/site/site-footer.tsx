import { GitHubIcon } from '@/components/icons/social/github-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'

export function SiteFooter() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <NewsletterForm
          headline="Stay in the loop"
          subheadline={
            <p>
              Get product updates, implementation insights, and practical guides for deploying controlled,
              enterprise-grade agentic AI.
            </p>
          }
          action="/"
        />
      }
      links={
        <>
          <FooterCategory title="Company">
            <FooterLink href="/agentic-automation-platform">Platform</FooterLink>
            <FooterLink href="/solutions">Solutions</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </FooterCategory>
          <FooterCategory title="Resources">
            <FooterLink href="/ai-agent-handbook">AI Handbook</FooterLink>
            <FooterLink href="/enterprise-ai-safety-handbook">Enterprise AI Safety Handbook</FooterLink>
            <FooterLink href="/blog">Insights</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterCategory>
          <FooterCategory title="Legal">
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
          </FooterCategory>
        </>
      }
      fineprint="© 2026 Orcaworks, Inc."
      socialLinks={
        <>
          <SocialLink href="https://x.com" name="X">
            <XIcon />
          </SocialLink>
          <SocialLink href="https://github.com" name="GitHub">
            <GitHubIcon />
          </SocialLink>
          <SocialLink href="https://www.youtube.com" name="YouTube">
            <YouTubeIcon />
          </SocialLink>
        </>
      }
    />
  )
}
