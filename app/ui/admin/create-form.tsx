import { Button } from "@/app/ui/button";
import Link from "next/link";

export default function Form() {
  return (
    <>
      <Link href="/admin?view=add">
        <Button type="button">Add a Product</Button>
      </Link>

      <Link href="/admin?view=edit">
        <Button type="button">Edit a Product</Button>
      </Link>
    </>
  );
}
