import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addGuestbookEntry, getGuestbookEntries } from "../actions";

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div>
      <h1>guestbook</h1>
      <p>leave a message below</p>
      <form action={addGuestbookEntry} className="flex flex-col mt-6">
        <Textarea
          name="message"
          placeholder="message"
          className="border-black mb-2"
        />
        <div className="self-end">
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="underline mb-4">recent messages</h2>
        {entries.map((entry) => (
          <div key={entry.id} className="mb-4">
            <p>{entry.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(entry.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
