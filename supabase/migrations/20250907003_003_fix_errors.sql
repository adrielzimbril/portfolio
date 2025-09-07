-- Voir les triggers
\d newsletter_subscribers

-- Lister les fonctions associées
SELECT tgname, tgrelid::regclass, tgfoid::regprocedure
FROM pg_trigger
WHERE tgrelid = 'newsletter_subscribers'::regclass;
