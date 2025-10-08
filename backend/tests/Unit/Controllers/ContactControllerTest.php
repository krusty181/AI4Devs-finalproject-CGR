<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use BootBookingCamp\Infrastructure\Controller\ContactController;
use BootBookingCamp\Infrastructure\Repository\JsonContactRepository;
use BootBookingCamp\Domain\Entity\ContactRequest;

class ContactControllerTest extends TestCase
{
    private ContactController $controller;
    /** @var JsonContactRepository|MockObject */
    private $repository;
    /** @var ServerRequestInterface|MockObject */
    private $request;
    /** @var ResponseInterface|MockObject */
    private $response;

    protected function setUp(): void
    {
        $this->repository = $this->createMock(JsonContactRepository::class);
        $this->controller = new ContactController($this->repository);
        $this->request = $this->createMock(ServerRequestInterface::class);
        $this->response = $this->createMock(ResponseInterface::class);
    }

    public function testSubmitContactSuccess(): void
    {
        // Arrange
        $requestData = [
            'name' => 'Juan Pérez',
            'email' => 'juan@email.com',
            'phone' => '666123456',
            'message' => 'Me interesa reservar',
            'check_in_date' => '2024-07-15',
            'check_out_date' => '2024-07-20',
            'guests' => 4
        ];

        $this->request
            ->expects($this->once())
            ->method('getParsedBody')
            ->willReturn($requestData);

        $contactRequest = new ContactRequest();
        $contactRequest->setName($requestData['name']);
        $contactRequest->setEmail($requestData['email']);
        $contactRequest->setPhone($requestData['phone']);
        $contactRequest->setMessage($requestData['message']);
        $contactRequest->setCheckInDate(new \DateTime($requestData['check_in_date']));
        $contactRequest->setCheckOutDate(new \DateTime($requestData['check_out_date']));
        $contactRequest->setGuests($requestData['guests']);

        $this->repository
            ->expects($this->once())
            ->method('save')
            ->with($this->isInstanceOf(ContactRequest::class))
            ->willReturn($contactRequest);

        $this->response
            ->expects($this->once())
            ->method('withHeader')
            ->with('Content-Type', 'application/json')
            ->willReturnSelf();

        $this->response
            ->expects($this->once())
            ->method('withStatus')
            ->with(201)
            ->willReturnSelf();

        // Act
        $result = $this->controller->submitContact($this->request, $this->response);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }

    public function testSubmitContactValidationError(): void
    {
        // Arrange
        $requestData = [
            'name' => '', // Invalid: empty name
            'email' => 'invalid-email', // Invalid: bad email format
            'message' => 'Test message'
        ];

        $this->request
            ->expects($this->once())
            ->method('getParsedBody')
            ->willReturn($requestData);

        $this->response
            ->expects($this->once())
            ->method('withHeader')
            ->with('Content-Type', 'application/json')
            ->willReturnSelf();

        $this->response
            ->expects($this->once())
            ->method('withStatus')
            ->with(422)
            ->willReturnSelf();

        // Act
        $result = $this->controller->submitContact($this->request, $this->response);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }

    public function testGetAllContactRequests(): void
    {
        // Arrange
        $contacts = [
            (new ContactRequest())->setId(1)->setName('Juan Pérez')->setEmail('juan@email.com')
        ];
        
        $this->repository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($contacts);

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
        $result = $this->controller->getAllContacts($this->request, $this->response);

        // Assert
        $this->assertInstanceOf(ResponseInterface::class, $result);
    }
}