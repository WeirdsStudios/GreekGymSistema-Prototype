import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Palette, MapPin, Smartphone, CreditCard, LayoutGrid, Save } from "lucide-react";
import logo from "figma:asset/97ec0abb43b4ac0b7e0df2d7b6a6727890f554fd.png";

export function Settings() {
    return (
        <div className="p-6 space-y-6 max-w-[1000px] mx-auto">
            <div className="flex justify-between items-center">
                <div>
                   <h1 className="text-3xl font-bold text-[#090909]">Ajustes</h1>
                   <p className="text-slate-500">Configuración general del sistema y módulos.</p>
                </div>
                <Button className="bg-[#D4AF37] hover:bg-[#FCDE7C] text-[#090909] font-semibold gap-2">
                    <Save className="w-4 h-4" /> Guardar Cambios
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
                    <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
                    <TabsTrigger value="modules" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Módulos</TabsTrigger>
                    <TabsTrigger value="branches" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Sucursales</TabsTrigger>
                    <TabsTrigger value="plans" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Planes</TabsTrigger>
                    <TabsTrigger value="integrations" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Integraciones</TabsTrigger>
                </TabsList>

                {/* General / Branding */}
                <TabsContent value="general" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-amber-500" /> Branding</CardTitle>
                            <CardDescription>Personaliza la apariencia de tu panel administrativo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Nombre del Gimnasio</Label>
                                    <Input defaultValue="Greek Gym" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Color Primario</Label>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37] border border-slate-200"></div>
                                        <Input defaultValue="#FCDE7C" className="font-mono" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Logo del Gimnasio</Label>
                                <div className="flex items-center gap-4 border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 border border-slate-200">
                                        <img src={logo} alt="Logo Preview" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <Button variant="outline" size="sm">Subir Nuevo</Button>
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG o SVG. Max 2MB.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-amber-500" /> Configuración POS</CardTitle>
                            <CardDescription>Ajustes de facturación y punto de venta.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center justify-between">
                                <Label>Habilitar pagos en efectivo</Label>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label>Emitir facturas automáticamente</Label>
                                <Switch />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label>Permitir pagos parciales</Label>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Modules */}
                <TabsContent value="modules" className="space-y-4 mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-[#D4AF37]" /> Módulos del Sistema</CardTitle>
                            <CardDescription>Activa o desactiva funcionalidades según tus necesidades.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Dietas y Nutrición</Label>
                                    <p className="text-sm text-slate-500">Permite asignar planes alimenticios a los miembros.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Seguimiento de Actividad</Label>
                                    <p className="text-sm text-slate-500">Gráficos de progreso y rutinas de ejercicio.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Control de Hidratación</Label>
                                    <p className="text-sm text-slate-500">Módulo simple para registro de consumo de agua.</p>
                                </div>
                                <Switch />
                            </div>
                             <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Reservas de Clases</Label>
                                    <p className="text-sm text-slate-500">Calendario y gestión de cupos para clases grupales.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Branches */}
                 <TabsContent value="branches" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-500" /> Sucursales</CardTitle>
                            <CardDescription>Gestiona las ubicaciones de tu gimnasio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Configuración de múltiples sedes disponible en el plan Enterprise.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations */}
                 <TabsContent value="integrations" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Smartphone className="w-5 h-5 text-[#D4AF37]" /> Integraciones</CardTitle>
                            <CardDescription>Conecta con aplicaciones de terceros.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between border p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">🍎</div>
                                    <div>
                                        <p className="font-semibold">Apple Health</p>
                                        <p className="text-xs text-slate-500">Sincronización de actividad</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Conectar</Button>
                            </div>
                             <div className="flex items-center justify-between border p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">🤖</div>
                                    <div>
                                        <p className="font-semibold">Google Fit</p>
                                        <p className="text-xs text-slate-500">Sincronización de actividad</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Conectar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
