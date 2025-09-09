# Event tracking report

This document lists all PostHog events that have been automatically added to your Next.js application.

## Events by File

### src/app/(base)/newsletter/page.tsx

- **newsletter_subscribe_clicked**: Fired when a user clicks the 'Recevoir !🦄' button to open the newsletter subscription modal.

### src/components/SubscriptionModal.tsx

- **subscription_modal_optional_info_submitted**: User submits the optional information (name, phone) in the subscription modal.
- **subscription_modal_skipped**: User closes or skips the subscription modal without submitting optional information.

### src/app/(base)/(home)/sections/NavbarSection.tsx

- **navbar_tab_clicked**: Fired when a user clicks on a navigation tab in the navbar.
- **contact_button_clicked**: Fired when a user clicks the 'Parler de SaaS 👋' button in the navbar.

### src/app/(base)/(home)/sections/ProjectsSection.tsx

- **project-card-clicked**: Fired when a user clicks on a project card in the projects section on the homepage.

### src/app/(base)/(home)/sections/ThoughtsSection.tsx

- **thought_card_clicked**: Tracks when a user clicks on a thought card in the homepage thoughts section.

### src/app/(base)/about/sections/InteractiveFunFactsSection.tsx

- **fun-fact-guess-submitted**: Fired when a user submits a guess (true or false) for a fun fact.
- **fun-facts-game-reset**: Fired when a user clicks the button to reset and replay the fun facts game.
- **fun-facts-answers-viewed**: Fired when a user clicks the button to view all the facts and their answers.

### src/components/shared/mode-toggle.tsx

- **theme_changed**: Tracks when a user clicks the button to change the color theme. Properties include the theme they are changing from and the theme they are changing to.


## Events still awaiting implementation
- (human: you can fill these in)
---

## Next Steps

1. Review the changes made to your files
2. Test that events are being captured correctly
3. Create insights and dashboards in PostHog
4. Make a list of events we missed above. Knock them out yourself, or give this file to an agent.

Learn more about what to measure with PostHog and why: https://posthog.com/docs/new-to-posthog/getting-hogpilled
