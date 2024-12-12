package com.liferay.clientesapi.service;

import com.liferay.clientesapi.model.Cliente;
import com.liferay.clientesapi.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Arrays;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Zé da marmita");
        cliente.setCpf("12345678999");
    }

    @Test
    void testSalvarCliente() {
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        Cliente savedCliente = clienteService.salvar(cliente);

        assertNotNull(savedCliente);
        assertEquals("Zé da marmita", savedCliente.getNome());
        verify(clienteRepository, times(1)).save(cliente);
    }

    @Test
    void testBuscarClientePorId() {
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        Cliente foundCliente = clienteService.buscarPorId(1L);

        assertNotNull(foundCliente);
        assertEquals("Zé da marmita", foundCliente.getNome());
    }

    @Test
    void testListarClientes() {
        when(clienteRepository.findAll()).thenReturn(Arrays.asList(cliente));

        var clientes = clienteService.listarTodos();

        assertFalse(clientes.isEmpty());
        assertEquals(1, clientes.size());
    }

    @Test
    void testExcluirCliente() {
        doNothing().when(clienteRepository).deleteById(1L);

        clienteService.excluir(1L);

        verify(clienteRepository, times(1)).deleteById(1L);
    }
}
