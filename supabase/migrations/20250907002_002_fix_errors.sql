-- Pour users.email
ALTER TABLE users
ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Pour newsletter_subscribers.user_id
ALTER TABLE newsletter_subscribers
ADD CONSTRAINT newsletter_subscribers_user_id_unique UNIQUE (user_id);
