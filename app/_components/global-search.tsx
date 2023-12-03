"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  GlobalSearchSchema,
  globalSearchSchema,
} from "./global-search/schemas";

export function GlobalSearch() {
  const form = useForm<GlobalSearchSchema>({
    resolver: zodResolver(globalSearchSchema),
  });

  const handleSubmit = (values: GlobalSearchSchema) => {};

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(handleSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormControl>
              <Input {...field} type="search" placeholder="Search" />
            </FormControl>
          )}
        />
        <button className="sr-only">Search</button>
      </form>
    </Form>
  );
}
