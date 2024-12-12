package com.liferay.clientesapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.clientesapi.model.Cliente;
import com.liferay.clientesapi.service.ClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ClienteControllerTest {

    @Mock
    private ClienteService clienteService;

    @InjectMocks
    private ClienteController clienteController;

    @Autowired
    private MockMvc mockMvc;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Zé da marmita");
        cliente.setCpf("12345678999");

        mockMvc = MockMvcBuilders.standaloneSetup(clienteController).build();
    }

    @Test
    void testListarClientes() throws Exception {
        when(clienteService.listarTodos()).thenReturn(Arrays.asList(cliente));

        mockMvc.perform(get("/clientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Zé da marmita"));
    }

    @Test
    void testBuscarClientePorId() throws Exception {
        when(clienteService.buscarPorId(1L)).thenReturn(cliente);

        mockMvc.perform(get("/clientes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Zé da marmita"));
    }

    @Test
    void testSalvarCliente() throws Exception {
        when(clienteService.salvar(ArgumentMatchers.any(Cliente.class))).thenReturn(cliente);

        mockMvc.perform(post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(cliente)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Zé da marmita"));
    }

    @Test
    void testExcluirCliente() throws Exception {
        mockMvc.perform(delete("/clientes/1"))
                .andExpect(status().isNoContent());
    }
}
