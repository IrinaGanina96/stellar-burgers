import { getFeed } from "../action";
import feedSlice from "../slice";

describe('Тест feedSlice', () => {
    const initialState =  feedSlice.getInitialState();

    it('Должен обрабатывать pending', () => {
        const action = { type: getFeed.pending.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled', () => {
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

        const action = { type: getFeed.fulfilled.type, payload: {orders, total: 100, totalToday: 50}};
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, orders, total:100, totalToday: 50});
    });

    it('Должен обрабатывать rejected', () => {
        const action = { type: getFeed.rejected.type, error: { message:"Test"} };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });
})
