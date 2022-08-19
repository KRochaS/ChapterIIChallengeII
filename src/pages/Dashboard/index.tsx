import { useEffect, useState } from 'react';

import { Food, IFood } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodsContainer } from './styles';


export function Dashboard() {
    const [foods, setFoods] = useState<IFood[]>([]);
    const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);


    useEffect(() => {
        async function getFoods() {
            const response = await api.get('/foods');
            setFoods(response.data);
        }

        getFoods();
    }, [])

    async function handleAddFood() {

        try {
            const response = await api.post('/foods', {
                ...foods,
                available: true,
            })
            setFoods([...foods, response.data]);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleUpdateFood() {

        try {
            const foodUpdated = await api.put(
                `/foods/${editingFood.id}`,
                { ...editingFood, ...foods },
            );

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );
            setFoods(foodsUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteFood(id: number) {

        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered);
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal() {

        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: IFood) {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    return (
        <>
            <Header openModal={toggleModal} />
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={() => handleDeleteFood(food.id)}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
}