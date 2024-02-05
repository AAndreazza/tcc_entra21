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
ALTER TABLE item ADD CONSTRAINT cadastroItem_TelaCadastro_usuario FOREIGN KEY item (usuario_cpf)
    REFERENCES Usuario (cpf);
ALTER TABLE item
	CHANGE COLUMN sg_setor CHAR(2) NOT NULL COMMENT '01 - Moradia, 02 - Lazer, 03 - Impostos, 04 - Financiamento, 05 - Educacao, 06 - Cuidados Pessoais, 07 - Mercado, 08 - Poupanca ou Investimentos, 09 - Saude, 10 - Transporte, 11 - Vestuario, 12 - Outros' COLLATE 'latin1_swedish_ci' AFTER descricao;
