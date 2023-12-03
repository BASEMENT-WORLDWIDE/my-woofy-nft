"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WoofyFormSchema, woofyFormSchema } from "./schemas";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { startTransition } from "react";
import { updateWoofyMetadata } from "./actions";

type WoofyFormProps = {
  rarity: number;
  initialValues: WoofyFormSchema;
};

export function WoofyForm({ initialValues, rarity }: WoofyFormProps) {
  const form = useForm<WoofyFormSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(woofyFormSchema),
    mode: "onBlur",
  });
  const handleSubmit = (values: WoofyFormSchema) => {
    startTransition(() => {
      updateWoofyMetadata.bind(undefined, rarity)(values);
    });
  };
  const backstoryCharacters = form.watch("backstory")?.length ?? 0;
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} disabled />
              </FormControl>
              <FormDescription>Min 2 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="backstory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Backstory{" "}
                <span className="tabular-nums">
                  ({backstoryCharacters} / 1024)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a backstory" {...field} disabled />
              </FormControl>
              <FormDescription>Max 1024 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
