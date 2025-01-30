import { getOrder, getOrderByNumber } from "../action";
import orderSlice from "../slice";

describe('Тест orderSlice', () => {
    const initialState =  orderSlice.getInitialState();

    it('Должен обрабатывать pending getOrder', () => {
        const action = { type: getOrder.pending.type };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled getOrder', () => {
        const orders = [
            {
                _id: '123',
                ingredients: ['1', '2'],
                status: 'done',
                name: 'Order 1',
                createdAt: '123',
                updatedAt: '123',
                number: 1
            },
           {
                _id: '456',
                ingredients: ['3', '4'],
                status: 'pending',
                name: 'Order 2',
                createdAt: '456',
                updatedAt: '456',
                number: 2
            }
        ]

        const action = { type: getOrder.fulfilled.type, payload: orders};
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, orders});
    });

    it('Должен обрабатывать rejected getOrder', () => {
        const action = { type: getOrder.rejected.type, error: { message:"Test"} };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending getOrderByNumber', () => {
        const action = { type: getOrderByNumber.pending.type };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled getOrderByNumber', () => {
        const order = 
            {
                _id: '123',
                ingredients: ['1', '2'],
                status: 'done',
                name: 'Order 1',
                createdAt: '123',
                updatedAt: '123',
                number: 1
            }
           
        const action = { type: getOrderByNumber.fulfilled.type, payload: {orders:[order]}};
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, ordersState:order});
    });

    it('Должен обрабатывать rejected getOrderByNumber', () => {
        const action = { type: getOrderByNumber.rejected.type, error: { message:"Test"} };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });
})
