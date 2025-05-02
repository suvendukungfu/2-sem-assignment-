import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
} from "../components/ui/card"; // adjust the path if needed

import {
  Input
} from "../components/ui/input";

import {
  Textarea
} from "../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../components/ui/form";

import { Button } from "../components/ui/button";
import { useAlerts } from "../context/AlertContext";
import { MapPin } from "lucide-react";

const AlertForm = () => {
  const { addAlert } = useAlerts();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: {
        latitude: 0,
        longitude: 0,
        address: ""
      },
      severity: "medium",
      status: "active",
      createdBy: "Current User"
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const enhancedData = {
        ...data,
        location: {
          ...data.location,
          latitude: data.location.latitude || 40.7128,
          longitude: data.location.longitude || -74.0060
        }
      };

      add
