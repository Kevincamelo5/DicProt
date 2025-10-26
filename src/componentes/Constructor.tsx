import React, { useState } from "react";
import Image from "../assets/Image.svg";
import Clip from "../assets/Clip.svg";

import "../StyleGeneral/Constructor.css"
// Plantilla para "iniciar sesion"
export const LoginTemplate = () => {
  return (
    <div>
      <h3>Iniciar Sesión </h3>
      <form>
        <label>
          usuario:
          <input type="text" name="user" />
        </label>
        <br />
        <label>
          contrasena:
          <input type="password" name="password" />
        </label>
        <br/>
        <button>Ingresar</button>
      </form>
    </div>
  );
};

export const RegisterTemplate = () => {
  return (
    <div>
      <h3>Registrarse</h3>
      <form>
        <label>
          usuario:
          <br/>
          <input type="text" name="user" />
        </label>
        <br/>
        <label>
          Datos de usuarios:
          <br/>
          <input type="text" name="datosExtra" />
        </label>
        <br/>
        <label>
          contraseña:
          <br/>
          <input type="password" name="password" />
        </label>
        <br/>
      </form>
      <button>Registrarse</button>
      <br />
      <a>ya estoy registrado</a>
    </div>
  )
}

export const MenuTemplate = () => {
  // Datos de ejemplo para las cartas del menú
  const menuItems = [
    {
      id: 1,
      image: Image,
      title: "Objeto 1",
      description: "Esta es la descripción del Objeto 1."
    },
    {
      id: 2,
      image: Image,
      title: "Objeto 2",
      description: "Esta es la descripción del Objeto 2."
    },
    {
      id: 3,
      image: Image,
      title: "Objeto 3",
      description: "Esta es la descripción del Objeto 3."
    }
  ];

  return (
    <div className="menu-container">
      <h3>Menú</h3>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            {/* Imagen */}
            <img src={item.image} alt={item.title} width={24} height={24} />
            {/* Texto */}
            <h4>{item.title}</h4>
            {/* Descripción */}
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SearchTemplate = () => {
  return (
    <div>
      <form>
        <label>
          buscar
          <input type="text"/>
        </label>
        <button><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"><path fill="#666666" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34M208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128"/></svg></button>
      </form>
    </div>
  )
}

export const CarouselTemplate = ({ caso }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = caso.slides
    ? caso.slides.map((text) => ({ content: text }))
    : [
      { content: "Texto de ejemplo 1" },
      { content: "Texto de ejemplo 2" },
      { content: "Texto de ejemplo 3" }
    ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <h3>{caso.name}</h3>
      <div className="carousel-slide">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            {slide.content}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="carousel-button prev">
        ←
      </button>
      <button onClick={nextSlide} className="carousel-button next">
        →
      </button>
    </div>
  );
};

export const AddElementTemplate = () => {
  return (
    <div>
      <div className="subir-imagen">
        <p> arrastre el documento aqui</p>
        <img src={Image} width={32} height={32} />
      </div>
      <form>
        <label>
          nombre:
          <input type="text" name="object" />
        </label>
        <br/>
        <label>
          descripción:
          <input type="text" name="string" />
        </label>
      </form>
      <br />
      <button>guardar</button>
      <button>cancelar</button>
    </div>
  )
}

export const RecoverPasswordTemplate = () => {
  return (
    <div>
      <form>
        <label>Igrese su correo electronico:
          <br/>
          <input type="text" name="string" />
        </label>
        <br/>
      </form>
      <button>Enviar</button>
    </div>
  )
}

export const ViewPerfilTemplate = () => {
  return (
    <div id="perfil-x">
      <img src={Image} width={64} height={64} />
      <br/>
      <p>nombre: user01</p>
      <br />
      <p>correo: xxxx@xxx.com</p>
    </div>
  )
};

export const CloseSessionTemplate = () => {
  const handleClick = () => {
    alert('Cofirmar si desea cerrar sesión')
  }
  return (
    <div className="close">
      <button className="close-button" onClick={handleClick}>Cerrar sesión</button>
    </div>
  )
}

export const PublishTemplate = () => {
  return (
    <div>
      <form>
        <label>agregar publicacion</label>
        <br/>
        <label> Escribe lo que piensas</label>
        <textarea> Escribir contenido</textarea>
      </form>
      <p>Agregar archivo <img src={Clip} width={12} height={12}/> </p>

      <button>publicar</button>
    </div>
  )
}
export const DefaultTemplate = ({caso} : { caso: any }) => {
  return (
    <div>
      <h3>{caso.name}</h3>
      <p>Descripción: {caso.description}</p>
      <p>Visión: {caso.vision}</p>
    </div>
  );
};

// En Constructor.tsx
export const ProfileEditTemplate = () => (
  <div className="profile-edit-template">
    <h2>Editar Perfil</h2>
    <div className="profile-header">
      <div className="profile-avatar">
        <img src="https://placehold.co/100x100" alt="Avatar" />
        <button className="change-avatar">Cambiar</button>
      </div>
    </div>
    <form className="profile-form">
      <div className="form-group">
        <label>Nombre completo</label>
        <input type="text" placeholder="Tu nombre" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="tu@email.com" />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input type="tel" placeholder="(123) 456-7890" />
      </div>
      <button type="submit" className="btn-primary">Guardar cambios</button>
    </form>
  </div>
);

export const NotificationSettingsTemplate = () => (
  <div className="notifications-template">
    <h2>Notificaciones</h2>
    <div className="notification-item">
      <div className="notification-info">
        <h3>Recordatorios de clases</h3>
        <p>Recibe notificaciones 1 hora antes de tu clase</p>
      </div>
      <label className="switch">
        <input type="checkbox" defaultChecked />
        <span className="slider"></span>
      </label>
    </div>
    <div className="notification-item">
      <div className="notification-info">
        <h3>Promociones</h3>
        <p>Notificaciones sobre ofertas especiales</p>
      </div>
      <label className="switch">
        <input type="checkbox" defaultChecked />
        <span className="slider"></span>
      </label>
    </div>
    {/* Más opciones */}
  </div>
);

export const ReportTemplate = () => (
  <div className="report-template">
    <h2>Reportes</h2>
    <div className="report-filters">
      <select>
        <option>Este mes</option>
        <option>Últimos 3 meses</option>
        <option>Este año</option>
      </select>
    </div>
    <div className="report-charts">
      <div className="chart-placeholder">
        <h3>Actividad Mensual</h3>
        <div className="chart-area" style={{height: '200px', backgroundColor: '#f5f5f5', borderRadius: '8px', margin: '10px 0'}}>
          {/* Aquí iría un gráfico real */}
        </div>
      </div>
    </div>
    <button className="btn-primary">Exportar PDF</button>
  </div>
);

export const AdminDashboardTemplate = () => (
  <div className="admin-dashboard">
    <h2>Panel de Administración</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Usuarios</h3>
        <div className="stat-value">1,245</div>
        <div className="stat-change">+12% desde el mes pasado</div>
      </div>
      <div className="stat-card">
        <h3>Ingresos</h3>
        <div className="stat-value">$12,450</div>
        <div className="stat-change">+8% desde el mes pasado</div>
      </div>
      {/* Más estadísticas */}
    </div>
    <div className="dashboard-content">
      <div className="content-section">
        <h3>Últimos usuarios registrados</h3>
        <table className="admin-table">
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>María García</td>
            <td>maria@example.com</td>
            <td>25/09/2023</td>
          </tr>
          {/* Más registros */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const AdvancedSearchTemplate = () => (
  <div className="search-advanced-template">
    <h2>Búsqueda Avanzada</h2>
    <div className="search-filters">
      <div className="filter-group">
        <label>Categoría</label>
        <select>
          <option>Todas las categorías</option>
          <option>Cafés</option>
          <option>Postres</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Precio máximo</label>
        <input type="range" min="0" max="10" step="0.5" />
        <div className="price-range">$0 - $10</div>
      </div>
      <div className="filter-group">
        <label>Ingredientes</label>
        <div className="ingredients">
          <label><input type="checkbox" /> Leche</label>
          <label><input type="checkbox" /> Azúcar</label>
          {/* Más opciones */}
        </div>
      </div>
    </div>
    <div className="search-results">
      {/* Resultados de búsqueda */}
    </div>
  </div>
);

export const ShoppingCartTemplate = () => (
  <div className="cart-template">
    <h2>Carrito de Compras</h2>
    <div className="cart-items">
      <div className="cart-item">
        <img src="https://placehold.co/60x60" alt="Producto" />
        <div className="item-details">
          <h3>Café Americano</h3>
          <p>Cantidad: 2</p>
          <p>$3.50 x 2 = $7.00</p>
        </div>
        <button className="remove-item">×</button>
      </div>
      {/* Más items */}
    </div>
    <div className="cart-summary">
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>$7.00</span>
      </div>
      <div className="summary-row">
        <span>Impuestos:</span>
        <span>$0.56</span>
      </div>
      <div className="summary-total">
        <span>Total:</span>
        <span>$7.56</span>
      </div>
      <button className="btn-primary checkout">Proceder al pago</button>
    </div>
  </div>
);

// En Constructor.tsx
export const ClassScheduleTemplate = () => (
  <div className="schedule-template">
    <h2>Horario de Clases</h2>
    <div className="schedule-filters">
      <button className="active">Hoy</button>
      <button>Esta semana</button>
      <button>Este mes</button>
    </div>
    <div className="class-list">
      <div className="class-item">
        <div className="class-time">07:00 - 08:00</div>
        <div className="class-name">Yoga Matutino</div>
        <div className="class-instructor">Instructor: María</div>
        <button className="btn-primary">Reservar</button>
      </div>
      {/* Más clases */}
    </div>
  </div>
);

export const AttendanceHistoryTemplate = () => (
  <div className="attendance-template">
    <h2>Historial de Asistencia</h2>
    <div className="attendance-stats">
      <div className="stat">
        <span className="value">12</span>
        <span className="label">Este mes</span>
      </div>
      <div className="stat">
        <span className="value">45</span>
        <span className="label">Este año</span>
      </div>
    </div>
    <div className="attendance-list">
      <div className="attendance-item">
        <span>25/09/2023</span>
        <span>Spinning</span>
      </div>
      {/* Más registros */}
    </div>
  </div>
);

export const PaymentTemplate = () => (
  <div className="payment-template">
    <h2>Métodos de Pago</h2>
    <div className="payment-methods">
      <div className="payment-method active">
        <i className="credit-card-icon"></i>
        <span>**** 4242</span>
        <span className="default-tag">Predeterminado</span>
      </div>
      <div className="payment-method">
        <i className="paypal-icon"></i>
        <span>cuenta@ejemplo.com</span>
      </div>
    </div>
    <button className="btn-secondary">Agregar método</button>

    <div className="subscription-section">
      <h3>Mi Suscripción</h3>
      <p>Plan Premium - $35/mes</p>
      <p>Renueva el 15/10/2023</p>
      <button className="btn-primary">Modificar suscripción</button>
    </div>
  </div>
);

export const OrderTemplate = () => (
  <div className="order-template">
    <h2>Pedido Actual</h2>
    <div className="order-items">
      <div className="order-item">
        <span>Café Americano x2</span>
        <span>$7.00</span>
      </div>
    </div>
    <div className="order-total">
      <strong>Total: $7.00</strong>
    </div>
    <div className="order-actions">
      <button className="btn-secondary">Agregar más</button>
      <button className="btn-primary">Proceder al pago</button>
    </div>
  </div>
);

// Plantilla para "Pago de Membresía"
export const MembershipPaymentTemplate = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Simular el proceso de pago
    alert("Pago exitoso");
  };

  return (
    <div className="membership-payment-template">
      <h2>Pago de Membresía</h2>
      <form>
        <label>
          Número de tarjeta:
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>
        <br />
        <label>
          Titular de la tarjeta:
          <input
            type="text"
            name="cardHolder"
            value={cardDetails.cardHolder}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            required
          />
        </label>
        <br />
        <label>
          Fecha de expiración:
          <input
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            required
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            placeholder="123"
            required
          />
        </label>
        <br />
        <button type="button" onClick={handlePayment}>
          Pagar
        </button>
      </form>
    </div>
  );
};

export const ReservationTemplate = () => (
  <div className="reservation-template">
    <h2>Reservar Mesa</h2>
    <div className="reservation-form">
      <div className="form-group">
        <label>Fecha</label>
        <input type="date" />
      </div>
      <div className="form-group">
        <label>Hora</label>
        <input type="time" />
      </div>
      <div className="form-group">
        <label>Número de personas</label>
        <select>
          <option>1 persona</option>
          <option>2 personas</option>
          {/* Más opciones */}
        </select>
      </div>
      <button className="btn-primary">Reservar</button>
    </div>
    <div className="reservation-confirmation" style={{display: 'none'}}>
      <h3>¡Reserva confirmada!</h3>
      <p>Mesa para 2 personas el 15/10/2023 a las 19:00</p>
    </div>
  </div>
);

// Plantilla para "Horario de Clases de Gimnasio"
export const GymClassScheduleTemplate = () => {
  // Definir los colores disponibles
  const colors = ["#9C2007", "#8FFAE4", "#F3FA8F", "#AEAEAD"];

  // Estado para almacenar la clase seleccionada
  const [selectedClass, setSelectedClass] = useState<{
    name: string;
    instructor: string;
    schedule: string;
  } | null>(null);

  // Horas y días de la semana
  const hours = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Generar un color aleatorio para cada casilla
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Manejar el clic en una casilla
  const handleCellClick = (color: string) => {
    if (color === "#9C2007") {
      alert("La clase se encuentra actualmente llena, por favor intente con otra clase o espere a que se libere algún espacio");
    } else if (color === "#AEAEAD") {
      alert("No existe alguna clase programada en este día y hora");
    } else if (color === "#8FFAE4" || color === "#F3FA8F") {
      setSelectedClass({
        name: "Yoga Matutino",
        instructor: "María López",
        schedule: "Lunes, Miércoles, Viernes - 7:00 AM - 8:00 AM",
      });
    }
  };

  return (
    <div className="gym-class-schedule-template">
      <h2>Horario de Clases del Gimnasio</h2>
      <table>
        <thead>
        <tr>
          <th>Hora</th>
          {daysOfWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {hours.map((hour, rowIndex) => (
          <tr key={rowIndex}>
            <td>{hour}</td>
            {daysOfWeek.map((_, colIndex) => {
              const color = getRandomColor();
              return (
                <td
                  key={colIndex}
                  style={{ backgroundColor: color }}
                  onClick={() => handleCellClick(color)}
                ></td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </table>

      {/* Modal para mostrar detalles de la clase */}
      {selectedClass && (
        <div className="class-details-modal">
          <div className="modal-content">
            <h3>{selectedClass.name}</h3>
            <p>Instructor: {selectedClass.instructor}</p>
            <p>Horario: {selectedClass.schedule}</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  alert("Inscrito exitosamente");
                  setSelectedClass(null);
                }}
              >
                Inscribirse / Desinscribirse
              </button>
              <button onClick={() => setSelectedClass(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};