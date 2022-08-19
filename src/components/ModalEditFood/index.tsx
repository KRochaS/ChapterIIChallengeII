import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { IFood } from '../Food';
import { FormHandles } from '@unform/core';

interface FormProps {
    image: string;
    name: string;
    price: number;
    description: string;
}


interface ModalEditFoodProps {
    isOpen: boolean;
    setIsOpen: () => void;
    editingFood: FormProps;
    handleUpdateFood: (data: FormProps) => void;
}


export function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps) {
    const formRef = createRef<FormHandles>();

    function handleSubmit(formValues: FormProps) {
        handleUpdateFood(formValues);
        setIsOpen();
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
                <h1>Editar Prato</h1>
                <Input name="image" placeholder="Cole o link aqui" />

                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />

                <Input name="description" placeholder="Descrição" />

                <button type="submit" data-testid="edit-food-button">
                    <div className="text">Editar Prato</div>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
    );
}