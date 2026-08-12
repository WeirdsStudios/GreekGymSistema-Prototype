import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, Users, MapPin, Plus, User } from "lucide-react";

// Mock Data
const classesData = [
  { id: 1, name: "Yoga Flow", trainer: "Ana Silva", time: "07:00 - 08:00", room: "Sala A", capacity: 20, enrolled: 18, status: "available", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "CrossFit", trainer: "Mike Tyson", time: "09:00 - 10:00", room: "Box Principal", capacity: 15, enrolled: 15, status: "full", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "HIIT", trainer: "Carlos Ruiz", time: "18:00 - 19:00", room: "Sala B", capacity: 25, enrolled: 20, status: "available", image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "Zumba", trainer: "Elena Gomez", time: "19:30 - 20:30", room: "Sala A", capacity: 30, enrolled: 28, status: "available", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "Spinning", trainer: "Sarah Connor", time: "06:00 - 06:45", room: "Box Principal", capacity: 12, enrolled: 12, status: "full", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500" },
];

export function Classes() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[090909]">Clases</h1>
           <p className="text-slate-500">Programación semanal y gestión de cupos.</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#D4AF37] hover:bg-[#FCDE7C] text-[#090909] font-semibold gap-2">
                    <Plus className="w-4 h-4" /> Nueva Clase
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Clase</DialogTitle>
                    <DialogDescription>Completa los detalles para programar una nueva sesión.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Nombre</Label>
                        <Input id="name" placeholder="Ej. Yoga Avanzado" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Entrenador</Label>
                         <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ana">Ana Silva</SelectItem>
                                <SelectItem value="mike">Mike Tyson</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Horario</Label>
                        <div className="col-span-3 flex gap-2">
                            <Input type="time" className="w-full" />
                            <span className="flex items-center">-</span>
                            <Input type="time" className="w-full" />
                        </div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Sala</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="a">Sala A</SelectItem>
                                <SelectItem value="b">Sala B</SelectItem>
                                <SelectItem value="box">Box Principal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                     <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                     <Button className="bg-[#D4AF37] text-[#090909] font-semibold" onClick={() => setIsModalOpen(false)}>Guardar Clase</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesData.map((cls) => (
            <Card key={cls.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="relative h-48 w-full">
                    <img src={cls.image} alt={cls.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-3 right-3">
                        {cls.status === 'full' ? (
                            <Badge className="bg-rose-500 text-white border-none shadow-sm">LLENO</Badge>
                        ) : (
                            <Badge className="bg-emerald-500 text-white border-none shadow-sm">DISPONIBLE</Badge>
                        )}
                    </div>
                </div>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold text-[#090909]">{cls.name}</CardTitle>
                        
                    </div>
                    <CardDescription className="flex items-center gap-1 text-slate-500">
                        <User className="w-4 h-4" /> {cls.trainer}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pb-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            {cls.time}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4 text-[#D4AF37]" />
                            {cls.room}
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${cls.status === 'full' ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{width: `${(cls.enrolled / cls.capacity) * 100}%`}}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>{cls.enrolled} inscritos</span>
                        <span>{cls.capacity} cupos</span>
                    </div>
                </CardContent>
                <CardFooter className="pt-3 border-t border-slate-100">
                    <Button variant="outline" className="w-full hover:bg-slate-50">Gestionar Asistentes</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
