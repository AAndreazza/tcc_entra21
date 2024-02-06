-- Table: TelaCadastro_usuario
CREATE TABLE Usuario (
    cpf char(11)  NOT NULL UNIQUE,
    nome varchar(100)  NOT NULL,
    email varchar(50)  NOT NULL UNIQUE,
    telefone char(15)  NOT NULL UNIQUE,
    dt_nascimento date  NOT NULL,
    senha varchar(15)  NOT NULL,
    CONSTRAINT TelaCadastro_usuario_pk PRIMARY KEY (cpf)
);

-- Table: cadastroItem
CREATE TABLE Item (
    cd_item int AUTO_INCREMENT NOT NULL,
    produto varchar(50)  NOT NULL,
    data_compra date  NOT NULL,
    valor decimal(6,4)  NOT NULL,
    quantidade int,
    descricao varchar(300),
    sg_setor char(2)  NOT NULL,
    usuario_cpf char(11)  NOT NULL,
    CONSTRAINT cadastroItem_pk PRIMARY KEY (cd_item),
    FOREIGN KEY item(usuario_cpf) REFERENCES usuario(cpf)
);

-- foreign keys
-- Reference: cadastroItem_TelaCadastro_usuario (table: cadastroItem)
ALTER TABLE item
	MODIFY COLUMN sg_setor CHAR(2) NOT NULL COMMENT '01 - Cuidados Pessoais, 02 - Educacao, 03 - Financiamento, 04 - Imposto, 05 - Lazer, 06 - Alimentos, 07 - Bebidas, 08 - Higiene, 09 - Limpeza, 10 - Nota Fiscal, 11 - Moradia, 12 - Poupanca ou Investimento, 13 - Saude, 14 - Transporte, 15 - Vestuario, 16 - Outros' COLLATE 'latin1_swedish_ci' AFTER descricao;
