import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import {
  getMasterclassRoleLabel,
  masterclasses,
} from "@/data/challenges-masterclasses";
import { getHumanDate } from "@/utils";

export function MasterclassesListSection() {
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {masterclasses.map((item) => (
          <Card
            key={item.slug}
            className="squircle squircle-b-base squircle-smooth-xl border"
          >
            <CardContent className="p-5 md:p-6 space-y-4">
              <div className="rounded-2xl border p-4 bg-b-white-invert-fr">
                <p className="text-sm font-medium text-b-base-accent">
                  {item.posterLabel}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-b-white-invert-sec text-sm">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{getHumanDate(item.date)}</Badge>
                <Badge variant="secondary">
                  {getMasterclassRoleLabel(item.role)}
                </Badge>
              </div>
              {item.links && item.links.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {item.links.map((link) => (
                    <Link key={link.href} href={link.href} likeButton whileTap>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
}

