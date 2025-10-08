<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use BootBookingCamp\Infrastructure\Controller\CampingController;
use BootBookingCamp\Infrastructure\Repository\JsonCampingRepository;
use BootBookingCamp\Domain\Entity\Camping;

class CampingControllerTest extends TestCase
{
    private CampingController $controller;
    /** @var JsonCampingRepository|MockObject */
    private $repository;
    /** @var ServerRequestInterface|MockObject */
    private $request;
    /** @var ResponseInterface|MockObject */
    private $response;

    protected function setUp(): void
    {
        $this->repository = $this->createMock(JsonCampingRepository::class);
        $this->controller = new CampingController($this->repository);
        $this->request = $this->createMock(ServerRequestInterface::class);
        $this->response = $this->createMock(ResponseInterface::class);
    }

    public function testGetCampingInfoSuccess(): void
    {
        // Arrange
        $camping = new Camping();
        $camping->setCampingId(1);
        $camping->setName('KCAMP - Camping Piloto');
        $camping->setDescription('Camping de prueba');
        $camping->setServices(['wifi', 'piscina', 'restaurante']);
        
        $this->repository
            ->expects($this->once())
            ->method('findById')
            ->with(1)
            ->willReturn($camping);

        $this->response
            ->expects($this->once())
            ->method('withHeader')
            ->with('Content-Type', 'application/json')
            ->willReturnSelf();

        $this->response
            ->expects($this->once())
            ->method('withStatus')
            ->with(200)
            ->willReturnSelf();

        // Act
        $result = $this->controller->getCampingInfo($this->request, $this->response, ['id' => '1']);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }

    public function testGetCampingInfoNotFound(): void
    {
        // Arrange
        $this->repository
            ->expects($this->once())
            ->method('findById')
            ->with(999)
            ->willReturn(null);

        $this->response
            ->expects($this->once())
            ->method('withHeader')
            ->with('Content-Type', 'application/json')
            ->willReturnSelf();

        $this->response
            ->expects($this->once())
            ->method('withStatus')
            ->with(404)
            ->willReturnSelf();

        // Act
        $result = $this->controller->getCampingInfo($this->request, $this->response, ['id' => '999']);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }

    public function testGetAllCampings(): void
    {
        // Arrange
        $campings = [
            (new Camping())->setCampingId(1)->setName('KCAMP - Camping Piloto')
        ];
        
        $this->repository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($campings);

        $this->response
            ->expects($this->once())
            ->method('withHeader')
            ->with('Content-Type', 'application/json')
            ->willReturnSelf();

        $this->response
            ->expects($this->once())
            ->method('withStatus')
            ->with(200)
            ->willReturnSelf();

        // Act
        $result = $this->controller->getAllCampings($this->request, $this->response);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }
}