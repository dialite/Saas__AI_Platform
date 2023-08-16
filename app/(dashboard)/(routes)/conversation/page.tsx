import Heading from "@/components/heading";
import { MessageSquare } from "../../../../node_modules/lucide-react";
import { useForm } from "react-hook-form";

const ConversationPage = () => {
  const form = useForm();
  return (
    <div>
      <Heading
        title="Conversation"
        description="The best conversation platform with AI"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8"></div>
    </div>
  );
};

export default ConversationPage;
