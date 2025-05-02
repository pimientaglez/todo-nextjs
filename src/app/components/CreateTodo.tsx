import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formatDateWithMicroseconds = (date: Date): string => {
  const isoString = date.toISOString(); // e.g., "2025-04-26T21:15:54.577Z"
  const [datePart, timePart] = isoString.split("T");
  const [time, milliseconds] = timePart.split(".");
  const microseconds = milliseconds.slice(0, -1) + "000"; // Add three extra zeros
  return `${datePart}T${time}.${microseconds}`;
};

interface CreateTodoProps {
  onTodoCreated: () => void;
}

interface createFormType {
  title: string;
  status: string;
  priority: string;
  version: number;
  createDate: string;
  promiseDate: string;
  completeDate: string | null;
}
const CreateTodo: React.FC<CreateTodoProps> = ({ onTodoCreated }) => {
  const [createFormData, setCreateFormData] = useState<createFormType>({
    title: "",
    status: "PENDING",
    priority: "Low",
    version: 0,
    createDate: formatDateWithMicroseconds(new Date()),
    promiseDate: "",
    completeDate: null,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData((prevState: createFormType) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleDropdownChange = (value: string) => {
    setCreateFormData((prevState: createFormType) => ({
      ...prevState,
      priority: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, priority: "" }));
  };
  const handleCalendarDateChange = (date: Date | undefined) => {
    if (date) {
      setCreateFormData((prevState: createFormType) => ({
        ...prevState,
        promiseDate: formatDateWithMicroseconds(date),
      }));
      setErrors((prevErrors) => ({ ...prevErrors, promiseDate: "" }));
      setIsCalendarOpen(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!createFormData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!createFormData.promiseDate) {
      newErrors.promiseDate = "Due date is required.";
    }
    if (!createFormData.priority) {
      newErrors.priority = "Priority is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await createTodo(createFormData);
      setCreateFormData({
        title: "",
        status: "PENDING",
        priority: "Low",
        version: 0,
        createDate: formatDateWithMicroseconds(new Date()),
        promiseDate: "",
        completeDate: null,
      });
      onTodoCreated();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const createTodo = async (formData: createFormType) => {
    formData.priority = formData.priority.toUpperCase();

    await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Pen className="mr-2 h-4 w-4" aria-hidden="true" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Fill in the form and click Create when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              name="title"
              value={createFormData.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
            {errors.title && (
              <p className="col-span-4 text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Priority
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{createFormData.priority}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDropdownChange("Low")}>
                  Low
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDropdownChange("Medium")}
                >
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownChange("High")}>
                  High
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.priority && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.priority}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Label htmlFor="name" className="text-right">
                  Due Date
                </Label>
              </PopoverTrigger>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !createFormData.createDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {createFormData.promiseDate ? (
                    format(createFormData.promiseDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    createFormData.promiseDate
                      ? new Date(createFormData.promiseDate)
                      : undefined
                  }
                  onSelect={handleCalendarDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.promiseDate && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.promiseDate}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleSubmit(e)
            }
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodo;
