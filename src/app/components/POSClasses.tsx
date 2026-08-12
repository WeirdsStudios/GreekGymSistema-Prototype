import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ArrowLeft, Clock, MapPin, User, Users,
  CheckCircle2, Search, Building2, Calendar,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "./ui/dialog";

interface GymClass {
  id: number;
  name: string;
  trainer: string;
  time: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: "available" | "full";
}

const CLASSES_TODAY: GymClass[] = [
  { id: 1, name: "Yoga Flow", trainer: "Ana Silva", time: "07:00 - 08:00", room: "Sala A", capacity: 20, enrolled: 18, status: "available" },
  { id: 2, name: "CrossFit", trainer: "Mike Tyson", time: "09:00 - 10:00", room: "Box Principal", capacity: 15, enrolled: 15, status: "full" },
  { id: 3, name: "HIIT", trainer: "Carlos Ruiz", time: "18:00 - 19:00", room: "Sala B", capacity: 25, enrolled: 20, status: "available" },
  { id: 4, name: "Zumba", trainer: "Elena Gomez", time: "19:30 - 20:30", room: "Sala A", capacity: 30, enrolled: 28, status: "available" },
  { id: 5, name: "Spinning", trainer: "Sarah Connor", time: "06:00 - 06:45", room: "Box Principal", capacity: 12, enrolled: 12, status: "full" },
];

interface POSClassesProps {
  onBack: () => void;
  cajeroName?: string;
  sucursal?: string;
}

export function POSClasses({
  onBack,
  cajeroName = "Araceli Arandas",
  sucursal = "Sucursal Centro",
}: POSClassesProps) {
  const [classes, setClasses] = useState<GymClass[]>(CLASSES_TODAY);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const available = classes.filter((c) => c.status === "available").length;
  const full = classes.filter((c) => c.status === "full").length;
  const totalSpots = classes.reduce((s, c) => s + c.enrolled, 0);

  const openModal = (cls: GymClass) => {
    setSelectedClass(cls);
    setMemberName("");
    setMemberId("");
    setConfirmSuccess(false);
    setIsModalOpen(true);
  };

  const confirmEnroll = () => {
    if (!selectedClass || !memberName) return;
    setClasses(classes.map((c) =>
      c.id === selectedClass.id
        ? { ...c, enrolled: c.enrolled + 1, status: c.enrolled + 1 >= c.capacity ? "full" : "available" }
        : c
    ));
    setConfirmSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmSuccess(false);
    }, 1800);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="outline" className="border-2 border-gray-300 font-semibold h-10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al POS
            </Button>
            <div>
              <h1 className="text-xl font-bold text-black flex items-center gap-2">
                <Calendar className="w-5 h-5" /> CLASES DE HOY
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{cajeroName}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{sucursal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 flex-shrink-0">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Clases</p>
              <p className="text-3xl font-bold text-black">{classes.length}</p>
              <p className="text-xs text-gray-400 mt-1">Programadas hoy</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <p className="text-xs text-green-700 uppercase tracking-wide mb-1">Disponibles</p>
              <p className="text-3xl font-bold text-green-700">{available}</p>
              <p className="text-xs text-gray-400 mt-1">Con cupos libres</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Inscritos</p>
              <p className="text-3xl font-bold text-black">{totalSpots}</p>
              <p className="text-xs text-gray-400 mt-1">{full} clases llenas</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar clase, entrenador o sala..."
            className="pl-10 h-11 border-2 border-gray-300 focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Classes grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((cls) => {
              const pct = Math.round((cls.enrolled / cls.capacity) * 100);
              const isFull = cls.status === "full";
              return (
                <Card key={cls.id} className={`border-2 transition-all ${isFull ? "border-gray-200 opacity-75" : "border-gray-200 hover:border-black hover:shadow-md"}`}>
                  <CardContent className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-black text-lg">{cls.name}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3" />{cls.trainer}
                        </p>
                      </div>
                      <Badge className={isFull
                        ? "bg-red-100 text-red-700 border-red-200 text-xs"
                        : "bg-green-100 text-green-700 border-green-200 text-xs"
                      }>
                        {isFull ? "Lleno" : "Disponible"}
                      </Badge>
                    </div>

                    {/* Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{cls.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{cls.room}</span>
                    </div>

                    {/* Capacity bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isFull ? "bg-red-500" : "bg-green-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{cls.enrolled} inscritos</span>
                        <span>{cls.capacity} cupos</span>
                      </div>
                    </div>

                    {/* Action */}
                    <Button
                      onClick={() => openModal(cls)}
                      disabled={isFull}
                      className={`w-full h-9 text-sm font-semibold ${isFull
                        ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {isFull ? "Sin cupos disponibles" : "Inscribir Miembro"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          {confirmSuccess ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-1">¡Inscripción Exitosa!</h3>
              <p className="text-sm text-gray-500">{memberName} inscrito en {selectedClass?.name}</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Inscribir Miembro — {selectedClass?.name}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Horario</p>
                    <p className="font-semibold text-black">{selectedClass?.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sala</p>
                    <p className="font-semibold text-black">{selectedClass?.room}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Entrenador</p>
                    <p className="font-semibold text-black">{selectedClass?.trainer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cupos</p>
                    <p className="font-semibold text-black">
                      {selectedClass?.enrolled} / {selectedClass?.capacity}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">Nombre del miembro *</Label>
                  <Input
                    placeholder="Ej: Ana García Martínez"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="h-11 border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">ID del miembro (opcional)</Label>
                  <Input
                    placeholder="Ej: GG001"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="h-11 border-2 border-gray-300 focus:border-black"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-11 border-2">
                  Cancelar
                </Button>
                <Button
                  onClick={confirmEnroll}
                  disabled={!memberName}
                  className="flex-1 h-11 bg-black text-white hover:bg-gray-800"
                >
                  Confirmar Inscripción
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}