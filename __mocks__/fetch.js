let mockData = {};

const mock = jest.fn(() => Promise.resolve(mockData));

function setData(data) {
    mockData = data;
}

export default {
    get: mock,
    post: mock,
    put: mock,
    delete: mock,
    setData
};
