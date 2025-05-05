document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('http://localhost:3000/clientes');
    const clientes = await response.json();

    const tbody = document.querySelector('#clientes tbody');
    
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.direccion}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.zona != null ? cliente.zona.nombre : 'No asignada'}</td>
        <td><img src="${cliente.imagen}" alt="${cliente.nombre}" width="50" /></td>
        <td>
          <a href="editar.html?id=${cliente.id}">Editar</a> |
          <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
        </td>
      `;
      
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar los clientes:', error);
  }
});
async function eliminarCliente(clienteId) {
  if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${clienteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Cliente eliminado');
        window.location.reload();  
      } else {
        alert('Error al eliminar cliente');
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert('Hubo un problema al eliminar el cliente');
    }
  }
}

