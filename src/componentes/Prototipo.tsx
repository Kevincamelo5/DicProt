  import React, { useState } from "react";
  import "../StyleGeneral/Prototipo.css";
  import {
  LoginTemplate,
  DefaultTemplate,
  RegisterTemplate,
  SearchTemplate,
  MenuTemplate,
  CarouselTemplate,
  AddElementTemplate,
  RecoverPasswordTemplate,
  CloseSessionTemplate,
  ViewPerfilTemplate,
  PublishTemplate,
  OrderTemplate,
  ReservationTemplate,
  ClassScheduleTemplate,
  AttendanceHistoryTemplate,
  PaymentTemplate,
  ProfileEditTemplate,
  NotificationSettingsTemplate,
  ReportTemplate,
  AdminDashboardTemplate,
  AdvancedSearchTemplate,
  ShoppingCartTemplate, MembershipPaymentTemplate, GymClassScheduleTemplate,
} from "./Constructor.tsx";
  import { calculateSimilarity } from "./calculateSimilarity.ts";

  interface WindPrtProps {
    casos: any[]; // Casos sin tipar explícitamente por simplicidad
    currentView: number | null;
  }

  const WindPrt: React.FC<WindPrtProps> = ({ casos, currentView }) => {
    try {
      const filteredCasos = currentView
        ? casos.filter((caso) => caso.id === currentView)
        : casos;

      // Estado para controlar el índice del carrusel
      const [currentIndex, setCurrentIndex] = useState(0);

      // Función para avanzar al siguiente caso
      const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredCasos.length);
      };

      // Función para retroceder al caso anterior
      const prevSlide = () => {
        setCurrentIndex((prev) =>
          prev === 0 ? filteredCasos.length - 1 : prev - 1
        );
      };

      // Determinar el template a usar según el caso actual
      const getTemplateComponent = (caso: any) => {
        const templateMap = [
          {
            names: ["registrar cuenta", "crear cuenta", "registrarse"],
            component: RegisterTemplate,
            threshold: 0.49,
          },
          {
            names: ["iniciar sesion", "acceder a cuenta", "entrar", "login"],
            component: LoginTemplate,
            threshold: 0.49,
          },
          {
            names: ["visualizar menu", "ver menu", "menu principal"],
            component: MenuTemplate,
            threshold: 0.49,
          },
          {
            names: ["visualizar carrusel", "ver carrusel", "galeria", "ver promocional"],
            component: CarouselTemplate,
            threshold: 0.49,
          },
          {
            names: ["cargar un archivo", "subir archivo", "agregar archivo"],
            component: AddElementTemplate,
            threshold: 0.49,
          },
          {
            names: ["recuperar contraseña", "restablecer contraseña", "olvide mi contraseña"],
            component: RecoverPasswordTemplate,
            threshold: 0.49,
          },
          {
            names: ["cerrar sesion", "salir", "desconectar"],
            component: CloseSessionTemplate,
            threshold: 0.49,
          },
          {
            names: ["ver perfil", "mi perfil", "perfil de usuario"],
            component: ViewPerfilTemplate,
            threshold: 0.49,
          },
          {
            names: ["publicar", "compartir", "postear"],
            component: PublishTemplate,
            threshold: 0.49,
          },
          {
            names: ["buscar x", "realizar busqueda", "encontrar"],
            component: SearchTemplate,
            threshold: 0.49,
          },
          {
            names: ["busqueda avanzada", "filtrar resultados", "buscar con filtros", "busqueda detallada"],
            component: AdvancedSearchTemplate,
            threshold: 0.49,
          },
          {
            names: ["abrir carrito", "ingresar a carrito", "meter producto a carrito"],
            component: ShoppingCartTemplate,
            threshold: 0.49,
          },
          {
            names:["realizar un pedido","pedir orden","elegir orden","ver pedido"],
            component: OrderTemplate,
            threshold: 0.49,
          },
          {
            names: ["reservar una mesa", "hacer una reservación", "reservar cupo"],
            component: ReservationTemplate,
            threshold: 0.49,
          },
          {
            names: ["visualizas clases", "ver horarios", "ver disponibilidad"],
            component: ClassScheduleTemplate,
            threshold: 0.49,
          },
          {
            names: ["asistencia", "historial", "mis clases", "historial de asistencia", "clases asistidas"],
            component: AttendanceHistoryTemplate,
            threshold: 0.49,
          },
          {
            names: ["pagar", "pago", "metodo de pago", "cobro", "cobrar"],
            component: PaymentTemplate,
            threshold: 0.74,
          },
          {
            names: ["pagar membrecia","cobrar membrecia","actualizar membrecia","pagar suscripcion", "membrecia","suscripcion"],
            component: MembershipPaymentTemplate,
            threshold: 0.49,
          },
          {
            names: ["editar perfil", "cambiar perfil", "ajustar perfil", "cambiar datos"],
            component: ProfileEditTemplate,
            threshold: 0.49,
          },
          {
            names: ["publicar notificaciones", "recibir notificaciones", "tener notificaciones"],
            component: NotificationSettingsTemplate,
            threshold: 0.49,
          },
          {
            names: ["reporte de ventas", "generar reporte", "crear reporte", "exportar resumen de ventas", "imprimir reporte"],
            component: ReportTemplate,
            threshold: 0.49,
          },
          {
            names: ["registrar nuevos usuarios", "inscribir empleados", "registrar empleados"],
            component: AdminDashboardTemplate,
            threshold: 0.49,
          },
          {
            names: ["inscribirse a clase","suscribirse a clase","registrarse a clase","ver calendario", "ver clases"],
            component: GymClassScheduleTemplate,
            threshold: 0.49,
          }
        ];

        let TemplateComponent = DefaultTemplate;
        let maxSimilarity = 0;

        templateMap.forEach((template) => {
          template.names.forEach((synonym) => {
            const similarity = calculateSimilarity(
              caso.name.toLowerCase(),
              synonym.toLowerCase()
            );
            if (similarity > template.threshold && similarity > maxSimilarity) {
              maxSimilarity = similarity;
              TemplateComponent = template.component;
            }
          });
        });

        return TemplateComponent;
      };

      if (filteredCasos.length === 0) {
        return <p>Sin casos visibles</p>;
      }

      const currentCaso = filteredCasos[currentIndex];
      const TemplateComponent = getTemplateComponent(currentCaso);

      return (
        <div className="windPrt">
          <h2>Plantilla de prototipo</h2>
          <div className="carousel-container">
            {/* Botón para retroceder */}
            <button onClick={prevSlide} className="carousel-button prev">
              ←
            </button>

            {/* Contenido del carrusel */}
            <div className="carousel-slide active">
              <TemplateComponent caso={currentCaso} />
            </div>

            {/* Botón para avanzar */}
            <button onClick={nextSlide} className="carousel-button next">
              →
            </button>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error en WindPrt:", error);
      return <div>Error al cargar el prototipo.</div>;
    }
  };

  export default WindPrt;