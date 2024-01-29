import { Settings } from "lucide-react";

import Heading from "@/components/ui/Heading";
import { SubscriptionButton } from "@/components/ui/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading heading="Settings" content="Manage account settings." />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-slate-300 text-sm">
          {isPro
            ? "You are currently on a Pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
