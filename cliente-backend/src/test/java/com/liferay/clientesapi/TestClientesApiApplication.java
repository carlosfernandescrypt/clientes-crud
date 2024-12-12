package com.liferay.clientesapi;

import org.springframework.boot.SpringApplication;

public class TestClientesApiApplication {

    public static void main(String[] args) {
        SpringApplication.from(ClientesApiApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
