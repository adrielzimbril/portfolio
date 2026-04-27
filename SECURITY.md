# Security Policy

## Supported Versions

Currently, only the latest version of Shirofolio is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |

## Reporting a Vulnerability

### How to Report

If you discover a security vulnerability, please report it responsibly.

**Do NOT:**

- Open a public issue
- Discuss it in public channels
- Exploit the vulnerability

**DO:**

- Send an email to [hello@adrielzimbril.com](mailto:hello@adrielzimbril.com)
- Include "Security Vulnerability" in the subject line
- Provide detailed information about the vulnerability
- Include steps to reproduce (if safe to do so)
- Suggest a fix if possible

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Affected versions
- Steps to reproduce
- Potential impact
- Proof of concept (if applicable and safe)
- Suggested mitigation or fix

### Response Timeline

- **Initial response**: Within 48 hours
- **Investigation**: Within 7 days
- **Resolution**: As soon as possible, depending on severity

### Disclosure Process

1. **Receipt**: You'll receive confirmation within 48 hours
2. **Investigation**: We'll investigate and validate the vulnerability
3. **Coordination**: We'll work with you to coordinate disclosure
4. **Fix**: We'll develop and test a fix
5. **Disclosure**: We'll disclose the vulnerability after the fix is deployed

## Security Best Practices

### For Developers

- Keep dependencies updated
- Use environment variables for sensitive data
- Never commit `.env.local` or secrets
- Review code before committing
- Use the provided `logger` instead of `console` for logging
- Follow the principle of least privilege

### For Users

- Keep your environment variables secure
- Use strong secrets and rotate them regularly
- Enable authentication in production
- Keep dependencies updated
- Review security advisories for dependencies

## Security Features

This project includes several security features:

- **Environment Variable Validation**: Automatic validation of required environment variables
- **Authentication**: Better Auth for secure authentication
- **Database Security**: Supabase with Row Level Security (RLS)
- **Bot Protection**: Cloudflare Turnstile integration
- **API Security**: Secret keys for API validation
- **Session Management**: Configurable session timeouts

## Dependencies

We regularly update dependencies to address security vulnerabilities. Dependencies are managed via pnpm.

To check for security vulnerabilities:

```bash
pnpm audit
```

## Security Advisories

Security advisories will be published on GitHub Security Advisories when vulnerabilities are disclosed.

## Acknowledgments

We thank all security researchers who help keep Shirofolio secure. Your responsible disclosure helps protect all users.

## Contact

For security-related questions or to report a vulnerability:

- **Email**: [hello@adrielzimbril.com](mailto:hello@adrielzimbril.com)
- **PGP Key**: Available on request

---

Thank you for helping keep Shirofolio secure! 🔒
