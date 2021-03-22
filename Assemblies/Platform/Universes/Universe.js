"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Universe = void 0;
class Universe {
    static GetById(universeId) {
        const universe = new Universe();
        universe.Id = universeId;
        universe.Name = 'test';
        return universe;
    }
}
exports.Universe = Universe;
